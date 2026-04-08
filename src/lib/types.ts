

export interface PlaneImage {
  url: string
  alt: string
}

export interface PlaneInterior {
  first: PlaneImage
  second: PlaneImage
  third: PlaneImage
}

export interface PlaneDetails {
  speed: number
  range: string
  capacity: number
  price: number
}


export interface Plane {
  brand: string
  model: string
  description: string
  details: PlaneDetails
  image: PlaneImage & {
    interior: PlaneInterior
  }
  slug: string
}


export type PlaneBasic = Pick<Plane, 'brand' | 'model' | 'slug'> & {
  details: Pick<PlaneDetails, 'capacity' | 'speed' | 'price' | 'range'>
}


export type PlaneCard = Pick<Plane, 'brand' | 'model' | 'slug'> & {
  details: Pick<PlaneDetails, 'price'>
  image: PlaneImage
}

export interface City {
  value: string
  code: string
}
