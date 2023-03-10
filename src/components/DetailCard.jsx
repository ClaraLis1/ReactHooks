import { useRef } from "react";
import { useQuery } from "react-query";
import EmptyCard from "./EmptyCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faCoffee, faDotCircle, faDownLeftAndUpRightToCenter, faLink, faLocation, faLocationDot, faShare } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'

const getUser = async(usuario) =>{
  const response = await fetch(`https://api.github.com/users/${usuario}`)
    
    return await response.json();
}


export default function DetailCard({user}) {
 
  const {isError, error ,isLoading, isSuccess, data, status} = useQuery(
      ["GET_USER", user],
      () => getUser(user),
      // {
      //   keepPreviusData:false,
      // }
  );



  if(isLoading){
    return <EmptyCard text = "Loading..."/>
  }

  console.log(isError);
  if (isError) {
    console.log(error);
    return <EmptyCard text = "Error. Try again please" />
  }
  
  status === "error"??<EmptyCard text = "Error. Try again please" />

  return (
    
    <div className="detail">
      <div className="left">
        <img
          className="avatar"
          src={data.avatar_url}
          alt={`avatar de ${data.user}`}
        />
      </div>
      <div className="right">
        <div className="title">
          <h2>{data.name ?? data.login}</h2>
          <a href={`https://github.com/${data.login}`} target="_blank" >@{data.login}</a>
        </div>
        <div className="stats">
          <div className="item">
            <small>Repos</small>
            <span>{data.public_repos}</span>
          </div>
          <div className="item">
            <small>Followers</small>
            <span>{data.followers}</span>
          </div>
          <div className="item">
            <small>Following</small>
            <span>{data.following}</span>
          </div>
        </div>
        <ul>
          <li>
          <FontAwesomeIcon icon={faLocationDot}/>{data.location ?? "Not available"}
          </li>
          <li>
          <FontAwesomeIcon icon={faTwitter} />{data.twitter_username ?? "Not available"}
          </li>
          <li>
            <FontAwesomeIcon icon={faLink}/> {data.blog == null ?  "Not available" : data.blog.split("//")[1] }
          </li>
          <li>
            <FontAwesomeIcon icon={faBuilding}/> {data.company ?? "Not available"}
          </li>
        </ul>
      </div>
    </div>
    
  );
}
