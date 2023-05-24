import HashLoader
from "react-spinners/HashLoader";
import '../../CSS/App.css'

export default function Loader() {
  return (
    <div className="Loader">
    <HashLoader
        color={'#A0D8B3'}
        loading={true}
        size={100}
    />
    </div>
  )
}
