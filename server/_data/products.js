const products = [
  {
    name: 'hanging vessel',
    imageURL: 'https://res.cloudinary.com/yonga/image/upload/v1605836730/yonga/images/hanging-vessels_mwl5ue.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, consequuntur? Eum sed architecto adipisci. Ducimus obcaecati porro ipsa asperiores similique possimus fuga nisi? Ipsa molestias pariatur voluptatibus, odit maxime, nostrum saepe necessitatibus soluta dolorem hic illum. Quae doloribus voluptatibus impedit laudantium sed dolorum omnis pariatur quo blanditiis asperiores ipsum officiis ut consectetur molestiae dolor aliquam quasi aliquid, cupiditate ullam eaque!',
    category: ['home'],
    price: 89.99,
    countInStock: 3,
    totalRating: 0,
    numReviews: 0
  },
  {
    name: 'cast iron bird',
    imageURL: 'https://res.cloudinary.com/yonga/image/upload/v1605836730/yonga/images/cast-iron-bird_esrhaf.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, consequuntur? Eum sed architecto adipisci. Ducimus obcaecati porro ipsa asperiores similique possimus fuga nisi? Ipsa molestias pariatur voluptatibus, odit maxime, nostrum saepe necessitatibus soluta dolorem hic illum. Quae doloribus voluptatibus impedit laudantium sed dolorum omnis pariatur quo blanditiis asperiores ipsum officiis ut consectetur molestiae dolor aliquam quasi aliquid, cupiditate ullam eaque!',
    category: ['home'],
    price: 73.99,
    countInStock: 2,
    totalRating: 0,
    numReviews: 2
  },
  {
    name: 'panamericana chair',
    imageURL: 'https://res.cloudinary.com/yonga/image/upload/v1605836730/yonga/images/panamericana-chair_ai6vh1.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, consequuntur? Eum sed architecto adipisci. Ducimus obcaecati porro ipsa asperiores similique possimus fuga nisi? Ipsa molestias pariatur voluptatibus, odit maxime, nostrum saepe necessitatibus soluta dolorem hic illum. Quae doloribus voluptatibus impedit laudantium sed dolorum omnis pariatur quo blanditiis asperiores ipsum officiis ut consectetur molestiae dolor aliquam quasi aliquid, cupiditate ullam eaque!',
    category: ['home'],
    price: 73.99,
    countInStock: 27,
    totalRating: 0,
    numReviews: 0
  },
  {
    name: 'boskke cube',
    imageURL: 'https://res.cloudinary.com/yonga/image/upload/v1605836730/yonga/images/boskke-cube_yczlax.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, consequuntur? Eum sed architecto adipisci. Ducimus obcaecati porro ipsa asperiores similique possimus fuga nisi? Ipsa molestias pariatur voluptatibus, odit maxime, nostrum saepe necessitatibus soluta dolorem hic illum. Quae doloribus voluptatibus impedit laudantium sed dolorum omnis pariatur quo blanditiis asperiores ipsum officiis ut consectetur molestiae dolor aliquam quasi aliquid, cupiditate ullam eaque!',
    category: ['home'],
    price: 153.59,
    countInStock: 15,
    totalRating: 0,
    numReviews: 0
  },
  {
    name: 'salad bowl',
    imageURL: 'https://res.cloudinary.com/yonga/image/upload/v1605836730/yonga/images/salad-bowl_kuwhti.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, consequuntur? Eum sed architecto adipisci. Ducimus obcaecati porro ipsa asperiores similique possimus fuga nisi? Ipsa molestias pariatur voluptatibus, odit maxime, nostrum saepe necessitatibus soluta dolorem hic illum. Quae doloribus voluptatibus impedit laudantium sed dolorum omnis pariatur quo blanditiis asperiores ipsum officiis ut consectetur molestiae dolor aliquam quasi aliquid, cupiditate ullam eaque!',
    category: ['home'],
    price: 13.59,
    countInStock: 30,
    totalRating: 0,
    numReviews: 1
  },
  {
    name: 'shapemaker',
    imageURL: 'https://res.cloudinary.com/yonga/image/upload/v1605836731/yonga/images/shapemaker_lkwkdh.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, consequuntur? Eum sed architecto adipisci. Ducimus obcaecati porro ipsa asperiores similique possimus fuga nisi? Ipsa molestias pariatur voluptatibus, odit maxime, nostrum saepe necessitatibus soluta dolorem hic illum. Quae doloribus voluptatibus impedit laudantium sed dolorum omnis pariatur quo blanditiis asperiores ipsum officiis ut consectetur molestiae dolor aliquam quasi aliquid, cupiditate ullam eaque!',
    category: ['children'],
    price: 53.59,
    countInStock: 10,
    totalRating: 0,
    numReviews: 1
  },
  {
    name: 'colors',
    imageURL: 'https://res.cloudinary.com/yonga/image/upload/v1605836730/yonga/images/colors_inmfws.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, consequuntur? Eum sed architecto adipisci. Ducimus obcaecati porro ipsa asperiores similique possimus fuga nisi? Ipsa molestias pariatur voluptatibus, odit maxime, nostrum saepe necessitatibus soluta dolorem hic illum. Quae doloribus voluptatibus impedit laudantium sed dolorum omnis pariatur quo blanditiis asperiores ipsum officiis ut consectetur molestiae dolor aliquam quasi aliquid, cupiditate ullam eaque!',
    category: ['children'],
    price: 5.89,
    countInStock: 0,
    totalRating: 0,
    numReviews: 20
  },
  {
    name: 'wolfie',
    imageURL: 'https://res.cloudinary.com/yonga/image/upload/v1605836731/yonga/images/wolfie_wjhiyn.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, consequuntur? Eum sed architecto adipisci. Ducimus obcaecati porro ipsa asperiores similique possimus fuga nisi? Ipsa molestias pariatur voluptatibus, odit maxime, nostrum saepe necessitatibus soluta dolorem hic illum. Quae doloribus voluptatibus impedit laudantium sed dolorum omnis pariatur quo blanditiis asperiores ipsum officiis ut consectetur molestiae dolor aliquam quasi aliquid, cupiditate ullam eaque!',
    category: ['children'],
    price: 9.0,
    countInStock: 5,
    totalRating: 0,
    numReviews: 1
  },
  {
    name: 'bridge backpack',
    imageURL: 'https://res.cloudinary.com/yonga/image/upload/v1605836730/yonga/images/bridge-bagpack_fwkiuk.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, consequuntur? Eum sed architecto adipisci. Ducimus obcaecati porro ipsa asperiores similique possimus fuga nisi? Ipsa molestias pariatur voluptatibus, odit maxime, nostrum saepe necessitatibus soluta dolorem hic illum. Quae doloribus voluptatibus impedit laudantium sed dolorum omnis pariatur quo blanditiis asperiores ipsum officiis ut consectetur molestiae dolor aliquam quasi aliquid, cupiditate ullam eaque!',
    category: ['outdoor'],
    price: 29.0,
    countInStock: 12,
    totalRating: 0,
    numReviews: 1
  },
  {
    name: 'standard bag',
    imageURL: 'https://res.cloudinary.com/yonga/image/upload/v1605836730/yonga/images/standard-bag_l6flsm.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, consequuntur? Eum sed architecto adipisci. Ducimus obcaecati porro ipsa asperiores similique possimus fuga nisi? Ipsa molestias pariatur voluptatibus, odit maxime, nostrum saepe necessitatibus soluta dolorem hic illum. Quae doloribus voluptatibus impedit laudantium sed dolorum omnis pariatur quo blanditiis asperiores ipsum officiis ut consectetur molestiae dolor aliquam quasi aliquid, cupiditate ullam eaque!',
    category: ['outdoor'],
    price: 23.0,
    countInStock: 56,
    totalRating: 0,
    numReviews: 1
  },
  {
    name: 'sweeper and funnel',
    imageURL: 'https://res.cloudinary.com/yonga/image/upload/v1605836730/yonga/images/sweeper-and-funnel_zivi5y.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, consequuntur? Eum sed architecto adipisci. Ducimus obcaecati porro ipsa asperiores similique possimus fuga nisi? Ipsa molestias pariatur voluptatibus, odit maxime, nostrum saepe necessitatibus soluta dolorem hic illum. Quae doloribus voluptatibus impedit laudantium sed dolorum omnis pariatur quo blanditiis asperiores ipsum officiis ut consectetur molestiae dolor aliquam quasi aliquid, cupiditate ullam eaque!',
    category: ['outdoor', 'home'],
    price: 18.0,
    countInStock: 3,
    totalRating: 0,
    numReviews: 1
  }
]

module.exports = products
