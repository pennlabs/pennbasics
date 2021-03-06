import React, { useState } from 'react'
import s from 'styled-components'
import ReactTooltip from 'react-tooltip'
import { Switch } from 'antd'
import 'antd/es/switch/style/index.css'

import { StarIcon, InfoIcon } from '../shared/Icons'
import { Text } from '../shared'
import { FOCUS_GRAY, BORDER, MEDIUM_GRAY, DARK_GRAY } from '../../styles/colors'

const TextArea = s.textarea`
  font-size: 1rem;
  font-weight: 200;
  color: ${MEDIUM_GRAY};
  resize: none;
  width: 100%;
  height: 10em;
  border: 1px solid ${FOCUS_GRAY};
  padding: 1em;

  :focus {
    outline: none;
    border: 1px solid ${BORDER};
    color: ${DARK_GRAY};
  }
`

const Buttons = s.div`
  float: right;
  margin-top: 1em;
`

const array = [1, 2, 3, 4, 5]

interface IRatingProps {
  rating: number
  setRating: (index: number) => void
}

const Rating = ({ rating, setRating }: IRatingProps) => (
  <div>
    {array.map(index => (
      <span // eslint-disable-line
        style={{ marginRight: '0.5em', cursor: 'pointer' }}
        onClick={() => {
          setRating(index)
        }}
      >
        <StarIcon
          style={{ color: '#ffc520', fill: rating && index <= rating ? '#ffc520' : 'none', transform: 'scale(0.8)' }}
        />
      </span>
    ))}
  </div>
)

interface IFormProps {
  show: boolean
  hideFunction: () => void
  updateReview: (rating: number, comment: string, showName: boolean) => void
}

const Form = ({ show, hideFunction, updateReview }: IFormProps) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [showName, setShowName] = useState(true)
  if (!show) {return null}

  return (
    <div style={{ marginBottom: '3rem' }}>
      <Text>
        <strong>Write a Review</strong>
      </Text>
      <br />
      <Rating rating={rating} setRating={setRating} />
      <br />
      <TextArea onChange={e => setComment(e.target.value)} />
      <div>
        <span style={{ fontSize: '80%' }}>
          Show my name
          <Switch
            onChange={() => setShowName(!showName)}
            style={{ margin: '0 0.5em' }}
          />
          Keep review anonymous
          <InfoIcon
            style={{ transform: 'scale(0.8) translateY(8px) translateX(2px)' }}
            data-tip
            data-for="infoIcon1"
          />
          <ReactTooltip
            id="infoIcon1"
            place="right"
            type="dark"
            effect="solid"
            multiline={true}
          >
            <div style={{ width: '200px' }}>
              Please note that every submitted review will be associated with
              your account information.
            </div>
          </ReactTooltip>
        </span>
      </div>
      <Buttons>
        <span // eslint-disable-line
          className="button is-light"
          onClick={() => {
            hideFunction()
            setRating(0)
            setComment('')
          }}
        >
          Cancel
        </span>
        <button // eslint-disable-line
          className="button is-success is-light"
          style={{ marginLeft: '0.5rem' }}
          disabled={!rating || !comment}
          onClick={() => {
            hideFunction()
            updateReview(rating, comment, showName)
          }}
        >
          Submit
        </button>
      </Buttons>
    </div>
  )
}

export default Form
