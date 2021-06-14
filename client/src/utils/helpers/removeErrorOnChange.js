const removeErrorOnChange = (e, error, setError) => {
  error[e.target.name] && setError({ ...error, [e.target.name]: '' })
}

export default removeErrorOnChange
