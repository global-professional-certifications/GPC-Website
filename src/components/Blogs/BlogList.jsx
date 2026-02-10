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
    const activeTag = searchParams.get('tag')

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
            } else if (activeTag) {
                // Filter by tag
                const filtered = allPosts.filter(post =>
                    post.tags?.includes(activeTag)
                )
                setPosts(filtered)
            } else {
                setPosts(allPosts)
            }
        }
        filterPosts()
    }, [activeCategory, activeTag, allPosts])

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

            <div className='relative pt-12 min-h-screen w-full bg-gray-50'>
                {/* Hero Section */}
                <div className="pb-6 px-4 lg:px-16 max-w-6xl mx-auto">
                    <div className="flex flex-col justify-center items-center text-center mb-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-semibold mb-3">
                            📚 Knowledge Hub
                        </span>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                            Blog & Expert <span className="text-brand-blue">Insights</span>
                        </h1>
                        <p className="text-sm md:text-base text-gray-600 max-w-xl">
                            Tips, trends, and success stories in audit, risk management, and professional certifications.
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

                <div className="px-4 lg:px-16 max-w-6xl mx-auto pb-16">
                    {/* Filters */}
                    <BlogFilters
                        categories={categories}
                        tags={tags}
                        activeCategory={activeCategory}
                        activeTag={activeTag}
                        onClearFilters={handleClearFilters}
                    />

                    {/* Results Count */}
                    {(activeCategory || activeTag || searchQuery) && (
                        <p className="text-sm text-gray-500 mb-4">
                            Found <span className="font-semibold text-gray-700">{filteredPosts.length}</span> article{filteredPosts.length !== 1 ? 's' : ''}
                        </p>
                    )}

                    {/* Featured Post */}
                    {featured && (
                        <section className="mb-10">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Featured</p>

                            <Link
                                to={`/blogs/${featured.slug?.current || featured.slug}`}
                                className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                <div className="grid md:grid-cols-2 gap-0">
                                    <div className="relative h-48 md:h-64 overflow-hidden">
                                        <img
                                            src={featured.mainImage ? urlFor(featured.mainImage).width(600).url() : ''}
                                            alt={featured.mainImage?.alt || featured.title}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    <div className="p-5 md:p-6 flex flex-col justify-center">
                                        {/* Categories */}
                                        <div className="flex flex-wrap gap-1.5 mb-2">
                                            {featured.categories?.slice(0, 2).map((cat, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2 py-0.5 text-[10px] font-semibold rounded-full"
                                                    style={{
                                                        backgroundColor: cat.color ? `${cat.color}20` : '#EEF2FF',
                                                        color: cat.color || '#4F46E5'
                                                    }}
                                                >
                                                    {cat.title}
                                                </span>
                                            ))}
                                        </div>

                                        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">
                                            {featured.title}
                                        </h2>

                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                            {featured.description || featured.excerpt}
                                        </p>

                                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                                            <span className="flex items-center gap-1">
                                                <User className="w-3 h-3" />
                                                {featured.author}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {formatDate(featured.publishedAt)}
                                            </span>
                                        </div>

                                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue text-white text-sm font-medium rounded-full group-hover:bg-brand-purple transition-colors w-fit">
                                            Read More <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </section>
                    )}

                    {/* Secondary Posts Grid */}
                    {secondary.length > 0 && (
                        <section className="mb-10">
                            <div className="grid md:grid-cols-2 gap-4">
                                {secondary.map((post) => (
                                    <Link
                                        key={post._id}
                                        to={`/blogs/${post.slug?.current || post.slug}`}
                                        className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="relative h-36 overflow-hidden">
                                            <img
                                                src={post.mainImage ? urlFor(post.mainImage).width(400).url() : ''}
                                                alt={post.mainImage?.alt || post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {post.categories?.[0] && (
                                                <span
                                                    className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-semibold rounded-full text-white"
                                                    style={{ backgroundColor: post.categories[0].color || '#4F46E5' }}
                                                >
                                                    {post.categories[0].title}
                                                </span>
                                            )}
                                        </div>

                                        <div className="p-4">
                                            <h3 className="text-base font-bold text-gray-900 mb-1.5 line-clamp-2 group-hover:text-brand-blue transition-colors">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                                                {post.description || post.excerpt}
                                            </p>

                                            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                                <span>{post.author}</span>
                                                <span>{formatDate(post.publishedAt)}</span>
                                            </div>

                                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue text-white text-xs font-medium rounded-full group-hover:bg-brand-purple transition-colors w-fit">
                                                Read More <ArrowRight className="w-3.5 h-3.5" />
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* All Posts Grid */}
                    {others.length > 0 && (
                        <section>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">More Articles</p>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {others.map((post) => (
                                    <Link
                                        key={post._id}
                                        to={`/blogs/${post.slug?.current || post.slug}`}
                                        className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                                    >
                                        <div className="relative h-32 overflow-hidden">
                                            <img
                                                src={post.mainImage ? urlFor(post.mainImage).width(300).url() : ''}
                                                alt={post.mainImage?.alt || post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>

                                        <div className="p-3 flex flex-col flex-grow">
                                            {post.tags?.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mb-2">
                                                    {post.tags.slice(0, 2).map((tag, idx) => (
                                                        <span key={idx} className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-gray-500 bg-gray-100 rounded">
                                                            <Tag className="w-2.5 h-2.5" />
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-brand-blue transition-colors">
                                                {post.title}
                                            </h3>

                                            <p className="text-gray-500 text-xs mb-2 line-clamp-2">
                                                {post.description || post.excerpt}
                                            </p>

                                            <div className="flex items-center justify-between text-[10px] text-gray-500 mb-3">
                                                <span>{formatDate(post.publishedAt)}</span>
                                            </div>

                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-blue text-white text-[10px] font-medium rounded-full group-hover:bg-brand-purple transition-colors w-fit">
                                                Read More <ArrowRight className="w-3 h-3" />
                                            </span>
                                        </div>
                                    </Link>
                                ))}
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
