import React, { useEffect, useState } from 'react'
import { useParams, Link, NavLink } from 'react-router-dom'
import { client } from '../../lib/sanity/client'
import { getPostBySlug, getRecentPosts } from '../../lib/sanity/queries'
import { urlFor } from '../../lib/sanity/imageBuilder'
import PortableTextRenderer from './PortableTextRenderer'
import MetaTags from '../MetaTags'
import { SchemaMarkup, getBlogPostingSchema, getBreadcrumbSchema } from '../Schema'
import { Calendar, User, ArrowRight, ArrowLeft, Tag, Share2, Linkedin, Twitter, Facebook, Link2, CheckCircle2 } from 'lucide-react'

const BlogPage = () => {
    const { slug } = useParams()
    const [post, setPost] = useState(null)
    const [relatedPosts, setRelatedPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const postData = await client.fetch(getPostBySlug, { slug })
                setPost(postData)

                const recent = await client.fetch(getRecentPosts)
                setRelatedPosts(recent.filter(p => p.slug.current !== slug))
            } catch (error) {
                console.error("Error fetching blog data:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
        window.scrollTo(0, 0)
    }, [slug])

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
    const shareUrls = {
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post?.title || '')}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    }

    const formatDate = (dateString) => {
        if (!dateString) return ''
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    if (loading) {
        return (
            <div className='relative min-h-screen w-full flex flex-col justify-center items-center bg-gray-50'>
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-brand-purple/20 border-t-brand-purple"></div>
                <p className="mt-3 text-gray-500 text-sm">Loading article...</p>
            </div>
        )
    }

    if (!post) {
        return (
            <div className="relative min-h-screen w-full flex flex-col justify-center items-center bg-gray-50">
                <p className="text-xl font-semibold text-gray-800 mb-2">Article not found</p>
                <Link to="/blogs" className="text-brand-blue font-medium flex items-center gap-1 hover:underline">
                    <ArrowLeft className="w-4 h-4" /> Back to Blog
                </Link>
            </div>
        )
    }

    const {
        title,
        description,
        author = '',
        authorImage,
        authorBio,
        mainImage,
        publishedAt,
        body,
        categories,
        tags,
        keyTakeaways,
        meta
    } = post

    const blogSchema = getBlogPostingSchema({
        title,
        description: meta?.metaDescription || description,
        image: mainImage ? urlFor(mainImage).url() : '',
        author,
        publishedDate: publishedAt,
        url: `https://globalprofessionalcertifications.com/blogs/${slug}`
    })

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: "https://globalprofessionalcertifications.com" },
        { name: "Blog", url: "https://globalprofessionalcertifications.com/blogs" },
        { name: title, url: `https://globalprofessionalcertifications.com/blogs/${slug}` }
    ])

    return (
        <>
            <SchemaMarkup schema={[blogSchema, breadcrumbSchema]} />
            <MetaTags
                title={meta?.metaTitle || `${title} | GPC Blog`}
                description={meta?.metaDescription || description}
                canonicalUrl={`https://globalprofessionalcertifications.com/blogs/${slug}`}
            />

            <div className="relative min-h-screen w-full bg-gray-50 py-12">
                {/* Header with proper spacing */}
                <div className="pb-6 px-12 max-w-5xl mx-auto">
                    {/* Back Button */}
                    <Link
                        to="/blogs"
                        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-blue mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Blogs
                    </Link>

                    {/* Categories - Clickable */}
                    {categories?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {categories.map((cat, idx) => (
                                <Link
                                    key={idx}
                                    to={`/blogs?category=${cat.slug?.current || cat.slug}`}
                                    className="px-2 py-0.5 text-xs font-semibold rounded-full text-white hover:opacity-80 transition-opacity"
                                    style={{ backgroundColor: cat.color || '#4F46E5' }}
                                >
                                    {cat.title}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                        {title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                        <span className="flex items-center gap-1.5">
                            {authorImage ? (
                                <img src={urlFor(authorImage).width(32).url()} alt={author} className="w-6 h-6 rounded-full object-cover" />
                            ) : (
                                <User className="w-4 h-4" />
                            )}
                            {author}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(publishedAt)}
                        </span>
                    </div>

                    {/* Cover Image */}
                    {mainImage && (
                        <img
                            src={urlFor(mainImage).width(900).url()}
                            alt={mainImage.alt || title}
                            className="w-full h-auto max-h-80 object-cover rounded-xl mb-6"
                        />
                    )}
                </div>

                {/* Content Area */}
                <div className="max-w-5xl mx-auto px-4 pb-6">
                    <div className="p-6 md:p-10">

                        {/* Key Takeaways */}
                        {keyTakeaways?.length > 0 && (
                            <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    💡 Key Takeaways
                                </h2>
                                <ul className="space-y-2">
                                    {keyTakeaways.map((takeaway, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700">{takeaway}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Blog Content */}
                        <article className="prose prose-sm md:prose-base max-w-none">
                            <PortableTextRenderer value={body} />
                        </article>

                        {/* Tags - Clickable */}
                        {tags?.length > 0 && (
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="flex flex-wrap items-center gap-1.5">
                                    <Tag className="w-4 h-4 text-gray-400" />
                                    {tags.map((tag, idx) => (
                                        <Link
                                            key={idx}
                                            to={`/blogs?tag=${encodeURIComponent(tag)}`}
                                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full hover:bg-gray-200 hover:text-gray-800 transition-colors"
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Share Section */}
                        <div className="mt-6 pt-12 border-t border-gray-200">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                                    <Share2 className="w-4 h-4" /> Share
                                </span>
                                <div className="flex items-center gap-2">
                                    <a href={shareUrls.linkedin} target="_blank" rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:scale-110 transition-transform">
                                        <Linkedin className="w-4 h-4" />
                                    </a>
                                    <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform">
                                        <Twitter className="w-4 h-4" />
                                    </a>
                                    <a href={shareUrls.facebook} target="_blank" rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform">
                                        <Facebook className="w-4 h-4" />
                                    </a>
                                    <button onClick={copyLink}
                                        className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-all">
                                        {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Author Box - Professional Design */}
                        <div className='mt-10 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
                            <div className='bg-gradient-to-r from-brand-blue/5 via-brand-purple/5 to-brand-blue/5 px-6 py-4 border-b border-gray-100'>
                                <p className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>About the Author</p>
                            </div>
                            <div className='p-6 md:p-8'>
                                <div className='flex flex-col md:flex-row items-center md:items-start gap-5'>
                                    <div className='w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-brand-blue/10 shadow-lg'>
                                        {authorImage ? (
                                            <img src={urlFor(authorImage).width(150).url()} alt={author} className='w-full h-full object-cover' />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white font-bold text-2xl">
                                                {author?.charAt(0) || 'A'}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className='text-xl font-bold text-gray-900 mb-1'>{author}</h3>
                                        <p className='text-sm text-brand-blue font-medium mb-3'>Expert Faculty</p>
                                        <p className='text-gray-600 text-sm leading-relaxed'>
                                            {authorBio || "Experienced professional with expertise in CIA, CISA, CRMA, and IAP training. Dedicated to helping professionals achieve their certification goals through comprehensive coaching and industry insights."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className='py-12'>
                        <div className='max-w-5xl mx-auto px-4 md:px-12 lg:px-16'>
                            <div className="flex items-center justify-between mb-5">
                                <h3 className='text-lg font-bold text-gray-900'>Related Articles</h3>
                            </div>

                            <div className='grid md:grid-cols-3 gap-4'>
                                {relatedPosts.slice(0, 3).map((related) => (
                                    <Link
                                        key={related._id}
                                        to={`/blogs/${related.slug.current || related.slug}`}
                                        className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
                                    >
                                        <div className="h-28 overflow-hidden">
                                            <img
                                                src={related.mainImage ? urlFor(related.mainImage).width(300).url() : ''}
                                                alt={related.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className='p-3'>
                                            {/* Show category on related posts */}
                                            {related.categories?.[0] && (
                                                <span
                                                    className="inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full text-white mb-2"
                                                    style={{ backgroundColor: related.categories[0].color || '#4F46E5' }}
                                                >
                                                    {related.categories[0].title}
                                                </span>
                                            )}
                                            <h4 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-brand-blue transition-colors">
                                                {related.title}
                                            </h4>
                                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                {related.description || related.excerpt}
                                            </p>
                                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue text-white text-xs font-medium rounded-full group-hover:bg-brand-purple transition-colors w-fit">
                                                Read More <ArrowRight className="w-3 h-3" />
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Bottom CTA */}
                <div className="py-8 flex justify-center">
                    <NavLink to="/blogs">
                        <button className="inline-flex items-center gap-2 bg-brand-blue text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-purple transition-colors">
                            <ArrowLeft className="w-4 h-4" /> More Articles
                        </button>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default BlogPage
