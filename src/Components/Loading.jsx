import React from 'react'
import { Grid } from 'react-loader-spinner'

export default function Loading() {
  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 bg-gray-100 bg-opacity-90 flex justify-center items-center">
<Grid
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="grid-loading"
  radius="12.5"
  wrapperStyle={{}}
  wrapperClass="grid-wrapper"
  />
    </div>
  )
}
