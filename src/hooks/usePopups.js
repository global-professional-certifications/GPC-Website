import { useState, useEffect } from 'react'
import { client } from '../lib/sanity/client'

/**
 * usePopups Hook - Manages popup display logic
 * Handles fetching active popups and applying display/trigger rules
 */

export const usePopups = () => {
    const [popups, setPopups] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPopups = async () => {
            try {
                const query = `*[_type == "popup" && status == "active" && !(_id in path("drafts.**"))] | order(priority desc) {
          _id,
          name,
          type,
          priority,
          title,
          message,
          ctaText,
          ctaLink,
          styling,
          displayRules,
          triggerRules
        }`

                const data = await client.fetch(query)
                setPopups(data)
            } catch (error) {
                console.error('Error fetching popups:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchPopups()
    }, [])

    // Helper function to check if popup should display on current page
    const shouldDisplayPopup = (popup, currentPath) => {
        const { displayRules } = popup

        if (!displayRules) return true

        // Check page rules
        switch (displayRules.showOn) {
            case 'home':
                if (currentPath !== '/') return false
                break
            case 'blog':
                if (!currentPath.startsWith('/blog')) return false
                break
            case 'custom':
                if (displayRules.customUrls && !displayRules.customUrls.some(url => currentPath.includes(url))) {
                    return false
                }
                break
            default:
                // 'all' - continue
                break
        }

        // Check exclude URLs
        if (displayRules.excludeUrls && displayRules.excludeUrls.some(url => currentPath.includes(url))) {
            return false
        }

        // Check device type (basic check)
        if (displayRules.deviceType && displayRules.deviceType !== 'all') {
            const isMobile = window.innerWidth <= 768
            const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024

            if (displayRules.deviceType === 'mobile' && !isMobile) return false
            if (displayRules.deviceType === 'tablet' && !isTablet) return false
            if (displayRules.deviceType === 'desktop' && (isMobile || isTablet)) return false
        }

        return true
    }

    // Helper function to check if popup should be shown based on frequency
    const shouldShowBasedOnFrequency = (popup) => {
        const { triggerRules } = popup

        if (!triggerRules) return true

        const storageKey = `popup_${popup._id}_lastShown`
        const lastShown = localStorage.getItem(storageKey)

        switch (triggerRules.frequency) {
            case 'session':
                // Check if already shown this session
                const shownThisSession = sessionStorage.getItem(storageKey)
                return !shownThisSession

            case 'days':
                if (!lastShown) return true
                const daysSinceShown = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60 * 24)
                return daysSinceShown >= (triggerRules.frequencyDays || 7)

            case 'always':
            default:
                return true
        }
    }

    // Mark popup as shown
    const markPopupAsShown = (popupId) => {
        const storageKey = `popup_${popupId}_lastShown`
        localStorage.setItem(storageKey, Date.now().toString())
        sessionStorage.setItem(storageKey, 'true')
    }

    return {
        popups,
        loading,
        shouldDisplayPopup,
        shouldShowBasedOnFrequency,
        markPopupAsShown,
    }
}
