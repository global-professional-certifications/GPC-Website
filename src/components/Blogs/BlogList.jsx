import React, { useEffect, useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { client } from '../../lib/sanity/client'
import { getAllPosts, getAllCategories, getAllTags, getPostsByCategory, getPostsByTag } from '../../lib/sanity/queries'
import { urlFor } from '../../lib/sanity/imageBuilder'
import MetaTags from '../MetaTags'
import BlogFilters from './BlogFilters'
import { Calendar, User, ArrowRight, Tag, Search, X } from 'lucide-react'

const BlogList = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [posts, setPosts] = useState([])
    const [allPosts, setAllPosts] = useState([])
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')

    const activeCategory = searchParams.get('category')

    // Fetch all data on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postsData, categoriesData, tagsData] = await Promise.all([
                    client.fetch(getAllPosts),
                    client.fetch(getAllCategories),
                    client.fetch(getAllTags)
                ])
                setAllPosts(postsData)
                setPosts(postsData)
                setCategories(categoriesData)
                setTags(tagsData?.filter(Boolean) || [])
            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    // Filter posts based on URL params
    useEffect(() => {
        const filterPosts = async () => {
            if (!allPosts.length) return

            if (activeCategory) {
                // Filter by category
                const filtered = allPosts.filter(post =>
                    post.categories?.some(cat =>
                        (cat.slug?.current || cat.slug) === activeCategory
                    )
                )
                setPosts(filtered)
            } else {
                setPosts(allPosts)
            }
        }
        filterPosts()
    }, [activeCategory, allPosts])

    // Search filter (client-side)
    const filteredPosts = useMemo(() => {
        if (!searchQuery.trim()) return posts
        const query = searchQuery.toLowerCase()
        return posts.filter(post =>
            post.title?.toLowerCase().includes(query) ||
            post.description?.toLowerCase().includes(query) ||
            post.excerpt?.toLowerCase().includes(query) ||
            post.tags?.some(tag => tag.toLowerCase().includes(query))
        )
    }, [posts, searchQuery])

    const handleClearFilters = () => {
        setSearchParams({})
        setSearchQuery('')
    }

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return ''
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    if (loading) {
        return (
            <div className='relative min-h-screen w-full flex flex-col justify-center items-center bg-gray-50'>
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-purple/20 border-t-brand-purple"></div>
                <p className="mt-3 text-gray-500 text-sm">Loading articles...</p>
            </div>
        )
    }

    const featured = filteredPosts[0]
    const secondary = filteredPosts.slice(1, 3)
    const others = filteredPosts.slice(3)

    return (
        <>
            <MetaTags
                title="Blog & Expert Insights | Global Professional Certifications"
                description="Stay updated with the latest tips, trends, and success stories in audit, risk management, and professional certifications."
                canonicalUrl="https://globalprofessionalcertifications.com/blogs"
            />

            <div className='relative pt-12 min-h-screen w-full bg-gray-50 overflow-hidden'>
                {/* Decorative Blobs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-blue/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -top-8 left-1/2 w-96 h-96 bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

                {/* Hero Section */}
                <div className="relative pb-6 px-6 md:px-12 max-w-7xl mx-auto z-10 pt-10">
                    <div className="flex flex-col justify-center items-center text-center mb-8">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                            Blog & Expert <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">Insights</span>
                        </h1>
                        <p className="text-base md:text-lg text-gray-600 max-w-2xl">
                            Stay updated with the latest tips, trends, and success stories in audit, risk management, and professional certifications.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-md mx-auto mb-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-10 py-2.5 rounded-full border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="px-6 md:px-12 max-w-7xl mx-auto pb-16">
                    <BlogFilters
                        categories={categories}
                        activeCategory={activeCategory}
                        onClearFilters={handleClearFilters}
                    />

                    {/* Results Count */}
                    {(activeCategory || searchQuery) && (
                        <p className="text-sm text-gray-500 mb-4">
                            Found <span className="font-semibold text-gray-700">{filteredPosts.length}</span> article{filteredPosts.length !== 1 ? 's' : ''}
                        </p>
                    )}

                    {/* Featured Post */}
                    {featured && (
                        <section className="mb-16">
                            <Link
                                to={`/blogs/${featured.slug?.current || featured.slug}`}
                                className="group flex flex-col md:flex-row bg-white border border-gray-200 transition-all hover:border-brand-blue/50 hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] rounded-2xl overflow-hidden relative"
                            >
                                <div className="absolute top-4 right-4 z-10">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 shadow-sm text-xs font-bold text-brand-purple">
                                        Featured
                                    </span>
                                </div>
                                <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto md:h-auto overflow-hidden bg-gray-50 flex items-center justify-center">
                                    {featured.mainImage ? (
                                        <img
                                            src={urlFor(featured.mainImage).width(1200).url()}
                                            alt={featured.mainImage?.alt || featured.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform duration-700 ease-out"></div>
                                    )}
                                </div>

                                <div className="p-6 md:p-10 flex flex-col justify-center w-full md:w-1/2">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {featured.categories?.slice(0, 2).map((cat, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full border bg-brand-blue/10 text-brand-blue border-brand-blue/20"
                                            >
                                                {cat.title}
                                            </span>
                                        ))}
                                    </div>

                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-brand-blue transition-colors line-clamp-2 leading-tight">
                                        {featured.title}
                                    </h2>

                                    <div className="flex items-center gap-4 text-[13px] text-gray-500 mb-3">
                                        <span className="flex items-center gap-1.5">
                                            <User className="w-3.5 h-3.5" />
                                            {featured.author}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {formatDate(featured.publishedAt)}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {featured.description || featured.excerpt}
                                    </p>

                                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center text-xs font-bold text-brand-blue uppercase tracking-wide">
                                        View Full Article
                                        <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1.5 transition-transform duration-300" />
                                    </div>
                                </div>
                            </Link>
                        </section>
                    )}

                    {/* Post Grid */}
                    {(secondary.length > 0 || others.length > 0) && (
                        <section>
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {[...secondary, ...others].map((post, postIdx) => {
                                    // Determine tag pill styling based on index (emerald, violet, amber)
                                    const styles = [
                                        'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
                                        'bg-violet-500/10 text-violet-600 border-violet-500/20',
                                        'bg-amber-500/10 text-amber-600 border-amber-500/20'
                                    ]
                                    const tagStyle = styles[postIdx % styles.length]
                                    const hoverBorder = [
                                        'hover:border-emerald-500/50 hover:shadow-[0_20px_50px_rgba(16,185,129,0.05)]',
                                        'hover:border-violet-500/50 hover:shadow-[0_20px_50px_rgba(139,92,246,0.05)]',
                                        'hover:border-amber-500/50 hover:shadow-[0_20px_50px_rgba(245,158,11,0.05)]'
                                    ][postIdx % styles.length]

                                    return (
                                        <Link
                                            key={post._id}
                                            to={`/blogs/${post.slug?.current || post.slug}`}
                                            className={`flex flex-col bg-white border border-gray-200 transition-all rounded-xl overflow-hidden group ${hoverBorder}`}
                                        >
                                            <div className="relative aspect-video overflow-hidden">
                                                {post.mainImage ? (
                                                    <img
                                                        src={urlFor(post.mainImage).width(600).url()}
                                                        alt={post.mainImage?.alt || post.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform duration-500 ease-out"></div>
                                                )}
                                            </div>

                                            <div className="p-5 flex flex-col flex-grow">
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {post.categories?.[0] && (
                                                        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${tagStyle}`}>
                                                            {post.categories[0].title}
                                                        </span>
                                                    )}
                                                </div>

                                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-blue transition-colors line-clamp-2 leading-tight">
                                                    {post.title}
                                                </h3>

                                                <div className="flex items-center gap-3 text-[11px] text-gray-500 mb-3">
                                                    <span>{formatDate(post.publishedAt)}</span>
                                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                    <span className="line-clamp-1">{post.author}</span>
                                                </div>

                                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                    {post.description || post.excerpt}
                                                </p>

                                                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center text-xs font-bold text-gray-900 group-hover:text-brand-blue uppercase tracking-wider transition-colors">
                                                    Read More
                                                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform duration-300" />
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </section>
                    )}

                    {filteredPosts.length === 0 && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-600 font-medium mb-2">No articles found</p>
                            <p className="text-gray-500 text-sm mb-4">
                                {searchQuery ? `No results for "${searchQuery}"` : 'No articles match your filters'}
                            </p>
                            <button
                                onClick={handleClearFilters}
                                className="text-brand-blue text-sm font-medium hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default BlogList
