import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Tag, X, Filter } from 'lucide-react'

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

    const hasActiveFilter = activeCategory || activeTag

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
                    {activeTag && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-700 text-white text-xs font-medium rounded-full">
                            <Tag className="w-3 h-3" />
                            {activeTag}
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
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        <Link
                            to="/blogs"
                            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${!activeCategory && !activeTag
                                    ? 'bg-brand-blue text-white shadow-md'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            All Posts
                        </Link>
                        {categories.map((category) => (
                            <Link
                                key={category._id}
                                to={`/blogs?category=${category.slug?.current || category.slug}`}
                                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === (category.slug?.current || category.slug)
                                        ? 'text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                style={
                                    activeCategory === (category.slug?.current || category.slug)
                                        ? { backgroundColor: category.color || '#4F46E5' }
                                        : {}
                                }
                            >
                                {category.title}
                                {category.postCount > 0 && (
                                    <span className={`ml-1.5 text-xs ${activeCategory === (category.slug?.current || category.slug)
                                            ? 'text-white/80'
                                            : 'text-gray-400'
                                        }`}>
                                        ({category.postCount})
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Tag Cloud */}
            {tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mr-2">
                        Tags:
                    </span>
                    {tags.slice(0, 12).map((tag) => (
                        <Link
                            key={tag}
                            to={`/blogs?tag=${encodeURIComponent(tag)}`}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200 ${activeTag === tag
                                    ? 'bg-gray-800 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                                }`}
                        >
                            <Tag className="w-3 h-3" />
                            {tag}
                        </Link>
                    ))}
                    {tags.length > 12 && (
                        <span className="text-xs text-gray-400">+{tags.length - 12} more</span>
                    )}
                </div>
            )}
        </div>
    )
}

export default BlogFilters
