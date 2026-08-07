import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Tag, X, Filter } from 'lucide-react'

// The Sanity "color" field is documented as a hex code, but in practice
// editors enter plain Tailwind color-family names (e.g. "purple", "emerald").
// Some of those happen to also be valid CSS keywords (purple, blue) so they
// render by luck; others (emerald, indigo, sky, ...) aren't real CSS colors
// and silently fail to apply, leaving the chip with no background at all.
// Resolve any of these to a real hex value before computing contrast.
const TAILWIND_COLOR_HEX = {
    red: '#dc2626', orange: '#ea580c', amber: '#d97706', yellow: '#ca8a04',
    lime: '#65a30d', green: '#16a34a', emerald: '#059669', teal: '#0d9488',
    cyan: '#0891b2', sky: '#0284c7', blue: '#2563eb', indigo: '#4f46e5',
    violet: '#7c3aed', purple: '#9333ea', fuchsia: '#c026d3', pink: '#db2777',
    rose: '#e11d48', slate: '#475569', gray: '#4b5563', zinc: '#52525b',
    neutral: '#525252', stone: '#57534e',
}

const resolveCategoryColor = (color) => {
    const fallback = '#4F46E5'
    if (!color || typeof color !== 'string') return fallback

    const trimmed = color.trim().toLowerCase()
    if (TAILWIND_COLOR_HEX[trimmed]) return TAILWIND_COLOR_HEX[trimmed]

    const hex = trimmed.replace('#', '')
    if (/^[0-9a-f]{3}$/.test(hex) || /^[0-9a-f]{6}$/.test(hex)) return `#${hex}`

    return fallback
}

// Compute relative luminance of a resolved hex color and pick a readable
// text color instead of assuming white always works.
const getContrastTextColor = (hexColor) => {
    let hex = hexColor.replace('#', '')
    if (hex.length === 3) {
        hex = hex.split('').map((c) => c + c).join('')
    }
    if (hex.length !== 6 || /[^0-9a-fA-F]/.test(hex)) return '#ffffff'

    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

    return luminance > 0.6 ? '#1f2937' : '#ffffff'
}

/**
 * BlogFilters - Reusable filter component for blog categories and tags
 * @param {Array} categories - Array of category objects with title, slug, color, postCount
 * @param {Array} tags - Array of tag strings
 * @param {string} activeCategory - Currently selected category slug
 * @param {string} activeTag - Currently selected tag
 * @param {function} onClearFilters - Callback to clear all filters
 */
const BlogFilters = ({ categories = [], tags = [], activeCategory, activeTag, onClearFilters }) => {
    const [searchParams] = useSearchParams()

    const hasActiveFilter = activeCategory

    return (
        <div className="mb-8">
            {/* Active Filter Indicator */}
            {hasActiveFilter && (
                <div className="flex items-center gap-2 mb-4 p-3 bg-brand-blue/5 rounded-lg border border-brand-blue/10">
                    <Filter className="w-4 h-4 text-brand-blue" />
                    <span className="text-sm text-gray-600">Filtering by:</span>
                    {activeCategory && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-brand-blue text-white text-xs font-medium rounded-full">
                            {categories.find(c => c.slug?.current === activeCategory)?.title || activeCategory}
                        </span>
                    )}
                    <button
                        onClick={onClearFilters}
                        className="ml-auto inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                        <X className="w-3 h-3" />
                        Clear
                    </button>
                </div>
            )}

            {/* Category Tabs */}
            {categories.length > 0 && (
                <div className="mb-4">
                    <div className="flex items-center gap-2 pb-2 overflow-x-auto no-scrollbar flex-nowrap justify-start px-1 md:flex-wrap md:overflow-visible md:justify-center md:px-0">
                        <Link
                            to="/blogs"
                            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${!activeCategory
                                    ? 'bg-brand-blue text-white shadow-md'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            All Posts
                        </Link>
                        {categories.map((category) => {
                            const isActive = activeCategory === (category.slug?.current || category.slug)
                            const bgColor = resolveCategoryColor(category.color)
                            const textColor = getContrastTextColor(bgColor)

                            return (
                                <Link
                                    key={category._id}
                                    to={`/blogs?category=${category.slug?.current || category.slug}`}
                                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                                            ? 'shadow-md'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    style={isActive ? { backgroundColor: bgColor, color: textColor } : {}}
                                >
                                    {category.title}
                                    {category.postCount > 0 && (
                                        <span
                                            className={`ml-1.5 text-xs ${isActive ? '' : 'text-gray-400'}`}
                                            style={isActive ? { color: textColor, opacity: 0.8 } : {}}
                                        >
                                            ({category.postCount})
                                        </span>
                                    )}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            )}

        </div>
    )
}

export default BlogFilters
