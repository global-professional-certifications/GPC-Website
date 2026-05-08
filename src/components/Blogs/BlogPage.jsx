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
        tldr,
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

            <div className="relative min-h-screen w-full bg-white pb-12">
                {/* Solid Brand Header */}
                <div className="bg-brand-blue pt-28 pb-16 md:pt-36 md:pb-24">
                    <div className="max-w-5xl mx-auto px-4 md:px-8">
                        {/* Breadcrumbs */}
                        <nav className="flex items-center gap-2 text-blue-100/70 text-xs md:text-sm mb-8 font-medium">
                            <Link to="/" className="hover:text-white transition-colors">Home</Link>
                            <span className="opacity-40">/</span>
                            <Link to="/blogs" className="hover:text-white transition-colors">Blog</Link>
                            <span className="opacity-40">/</span>
                            <span className="text-white truncate max-w-[200px] md:max-w-none">{title}</span>
                        </nav>

                        {/* Title */}
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                            {title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-blue-50">
                            <div className="flex items-center gap-3">
                                {authorImage ? (
                                    <img src={urlFor(authorImage).width(40).url()} alt={author} className="w-10 h-10 rounded-full object-cover border-2 border-white/20" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white border-2 border-white/20 font-bold">
                                        {author?.charAt(0) || 'A'}
                                    </div>
                                )}
                                <div className="flex flex-col">
                                    <span className="font-bold text-white leading-none mb-1">{author}</span>
                                    <span className="text-[11px] text-blue-100/70 uppercase tracking-wider font-semibold">Author</span>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                                <Calendar className="w-4 h-4 text-blue-200" />
                                <span className="font-medium">{formatDate(publishedAt)}</span>
                            </div>

                            {categories?.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((cat, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-white/10 text-white text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/20">
                                            {cat.title}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Cover Image Section */}
                <div className="max-w-5xl mx-auto px-4 -mt-8 md:-mt-12 mb-12">
                    <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                        {mainImage ? (
                            <img
                                src={urlFor(mainImage).width(1600).url()}
                                alt={mainImage.alt || title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-brand-blue to-brand-purple"></div>
                        )}
                    </div>
                </div>

                {/* Content Area */}
                <div className="max-w-5xl mx-auto px-4 pb-6">
                    <div className="p-6 md:p-10">

                        {/* TL;DR Summary */}
                        {tldr && (
                            <div className="mb-10 p-6 bg-blue-50/50 rounded-2xl border border-blue-100 flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-200">
                                    <CheckCircle2 className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-2">
                                        Quick Summary
                                    </h2>
                                    <p className="text-gray-700 leading-relaxed font-medium italic">
                                        "{tldr}"
                                    </p>
                                </div>
                            </div>
                        )}

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
                        <div className='mt-16 bg-gray-50 rounded-2xl p-8 border border-gray-100'>
                            <div className='flex flex-col md:flex-row items-center md:items-start gap-8'>
                                <div className='w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden flex-shrink-0 shadow-xl border-4 border-white'>
                                    {authorImage ? (
                                        <img src={urlFor(authorImage).width(200).url()} alt={author} className='w-full h-full object-cover' />
                                    ) : (
                                        <div className="w-full h-full bg-brand-blue flex items-center justify-center text-white font-bold text-3xl">
                                            {author?.charAt(0) || 'A'}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <p className='text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-2'>Published By</p>
                                    <h3 className='text-2xl font-bold text-gray-900 mb-2'>{author}</h3>
                                    <p className='text-gray-600 text-sm leading-relaxed mb-6'>
                                        {authorBio || "Experienced professional with expertise in CIA, CISA, CRMA, and IAP training. Dedicated to helping professionals achieve their certification goals."}
                                    </p>
                                    <Link to="/blogs" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wider">
                                        View All Articles by {author}
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
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

                            <div className='grid md:grid-cols-3 gap-6'>
                                {relatedPosts.slice(0, 3).map((related, postIdx) => {
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
                                            key={related._id}
                                            to={`/blogs/${related.slug?.current || related.slug}`}
                                            className={`flex flex-col h-full bg-white border border-gray-200 transition-all rounded-xl overflow-hidden group ${hoverBorder}`}
                                        >
                                            <div className="relative h-40 overflow-hidden">
                                                {related.mainImage ? (
                                                    <img
                                                        src={urlFor(related.mainImage).width(400).url()}
                                                        alt={related.mainImage?.alt || related.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform duration-500 ease-out"></div>
                                                )}
                                            </div>

                                            <div className="p-5 flex flex-col flex-grow">
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {related.categories?.[0] && (
                                                        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${tagStyle}`}>
                                                            {related.categories[0].title}
                                                        </span>
                                                    )}
                                                </div>

                                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">
                                                    {related.title}
                                                </h3>

                                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                    {related.description || related.excerpt}
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
