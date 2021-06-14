// Return SEO friendly URL for product page
// Removes spaces convert to dash

const slugifyProduct = productName => {
  const link = `/product/${productName.replace(/\s+/g, '-')}`

  return link
}

export default slugifyProduct
