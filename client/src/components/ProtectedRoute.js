import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute(props) {

    const navigate = useNavigate()

    useEffect(() => {
        if(!props.isAuth) {
            navigate('/Register')
        }
    })
    return props.children
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.isAuthenticated
    }
}

export default connect(mapStateToProps)(ProtectedRoute)