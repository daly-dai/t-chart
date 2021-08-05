const add = () => {
  const a = 768
  const b = 1
  return new Promise((resolve, reject) => {
    resolve(a + b)
  })
}
add()
