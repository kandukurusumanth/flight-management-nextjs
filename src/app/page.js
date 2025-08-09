export default function HomePage(){
  const token = localStorage.getItem("token")
  return token ? window.location.href="/flights"  : window.location.href="/user/login"(
    <>
      
    </>
  )
}