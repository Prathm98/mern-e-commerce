import React from 'react'
import PropTypes from 'prop-types'

const Rating = ({value, text, color}) => {
    const loadRating = n => {
        var row = []
        var k = 0
        for(var i=0; i<parseInt(n); i++){
            row.push(<span className="fas fa-star" style={{color: color}} key={k++}></span>)
        }
        if((n -parseInt(n)) === 0.5) row.push(<span className="fas fa-star-half-alt" style={{color: color}} key={k++}></span>)
        for(i=0; i<5-Math.round(n); i++){
            row.push(<span className="far fa-star" style={{color: color}} key={k++}></span>)
        }
        return row
    }
    return (
        <>
            {loadRating(value)} {text}
        </>
    )
}

Rating.defaultProps = {
    color: '#f8e825'
}

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    color: PropTypes.string,
    text: PropTypes.string.isRequired
}

export default Rating
