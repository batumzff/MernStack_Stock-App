import axios from "axios"
import { useSelector } from "react-redux"

const useAxios = () => {
  const { token } = useSelector((state) => state.auth)

  const axiosWithToken = axios.create({
    // baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: { Authorization: `Token ${token}` },
    baseURL:"/api/v2"
  })

  const axiosPublic = axios.create({
    // baseURL: `${process.env.REACT_APP_BASE_URL}`,
    baseURL:"/api/v2"
  })
  return { axiosWithToken, axiosPublic }
}

export default useAxios
