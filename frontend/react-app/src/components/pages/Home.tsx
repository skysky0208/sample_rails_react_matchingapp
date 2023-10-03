import React, {useContext} from "react"

import { AuthContext } from "App"

const Home: React.FC = () => {
    const {isSignedIn, currentUser} = useContext(AuthContext)

    return(
        <>
            {
                isSignedIn && currentUser ? (
                    <>
                        <h2>メールアドレス: {currentUser?.email}</h2>
                        <h2>名前: {currentUser?.name}</h2>
                    </>
                ) : (
                    <></>
                )
            }
        </>
    )
}

export default Home