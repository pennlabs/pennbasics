import React, { Component } from 'react'
import { BorderedCard, Row, Col, ColSpace, Line } from '../shared'

const renderExternalLink = (pictureURL, websiteURL, productName) => {
  return (
    <BorderedCard>
      <Row>
        <Col width="20%">
          <a href={websiteURL} target="_blank"> <img src={pictureURL} /> </a>
        </Col>
        <ColSpace />
        <Col>
          <a href={websiteURL} target="_blank"> {productName} </a>
        </Col>
      </Row>
    </BorderedCard>
  )
}

const renderUsefulLink = (websiteURL, description) => {
  return (
    <a href={websiteURL} target="_blank"> {description} </a>
  )
}

const mapping = [
  {
    "pictureURL": "https://raw.githubusercontent.com/pennlabs/clubs/master/static/img/peoplelogo.png",
    "websiteURL": "https://pennclubs.com/",
    "productName": "Penn Clubs"
  },
  {
    "pictureURL": "https://raw.githubusercontent.com/pennlabs/pennlabs.org/master/static/img/PCR.png",
    "websiteURL": "https://penncoursereview.com/",
    "productName": "Penn Course Review"
  },
  // {
  //   "pictureURL": "https://raw.githubusercontent.com/pennlabs/pennlabs.org/master/static/img/PCA.png",
  //   "websiteURL": "https://penncoursealert.com/"
  // },
  // {
  //   "pictureURL": "https://raw.githubusercontent.com/pennlabs/pennlabs.org/master/static/img/PCS.png",
  //   "websiteURL": "https://penncoursesearch.com/"
  // }
]

const usefulLinks = [
  {
    "websiteURL": "https://pennlabs.org/",
    "description": "Penn Labs"
  },
  {
    "websiteURL": "https://www.upenn.edu/",
    "description": "Penn Homepage"
  },
  {
    "websiteURL": "https://prod.campusexpress.upenn.edu/",
    "description": "CampusExpress"
  },
  {
    "websiteURL": "https://canvas.upenn.edu",
    "description": "Canvas"
  },
  {
    "PennInTouch": "https://pennintouch.apps.upenn.edu/pennInTouch/jsp/fast2.do",
    "description": "PennInTouch"
  }
]

class ExternalLinks extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const postid = '10158665909863776'
    const link = `https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FUnivPennsylvania%2Fposts%2F${postid}&width=500&show_text=true&height=587&appId`
    return (
      <BorderedCard>
        <h1 className="title is-4">More in the Penn Ecosystem</h1>
        {mapping.map(({ pictureURL, websiteURL, productName }) => {
          return renderExternalLink(pictureURL, websiteURL, productName)
        })}
        <Line />
        <br />
        {usefulLinks.map(({ websiteURL, description }, index) => {
          return (
            <>
              {renderUsefulLink(websiteURL, description)}
              {index == usefulLinks.length - 1 ? <></> : <br/>}
            </>
          )
        })}

      </BorderedCard>
    )
  }
}

export default ExternalLinks
