

export const Githubcard=({data})=>{
    return (
        <div>
            <img src={data.avatar_url} alt="user"/>
            <p>{data.login}</p>
        </div>
    )
}