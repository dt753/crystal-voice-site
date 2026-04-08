import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  output: 'standalone', // нужно для Docker
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
  },
})

export default withMDX(nextConfig)
