if(formData.location!='hulu'){
    axios.post(`http://localhost:3000/patient/find-doctor`,formData).then((result)=>{
      console.log(result.data)
      setFilteredDoctors(result.data)
    }).catch((error)=>{
      crossOriginIsolated.log(error)
    })
  }

  const fetchlocations = async () => {
    await axios.get(`http://localhost:3000/patient`).then((result) => {
      console.log(result.data)
      setLocation(result.data)
    }).catch((error) => {
      console.log(error)
    })
  }