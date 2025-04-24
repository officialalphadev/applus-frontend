import { Fragment } from 'react'

export type ListProps<T> = {
  data: T[]
  renderItem: (item: T, index: number) => React.ReactNode
}

export function List<T>({ renderItem, data }: ListProps<T>) {
  return data.map((item, index) => <Fragment key={index}>{renderItem(item, index)}</Fragment>)
}
