import React from 'react'
import { Button, Glyphicon, ProgressBar } from 'react-bootstrap'

export default class extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            uploading: false,
            now: 0
        }
    }
    onChange = (e) => {
        const t = this
        const {
            url,
            success = () => {},
            error = () => {}
        } = t.props

        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = (e) => {
            if (xhr.readyState === 4) {
                t.setState({
                    uploading: false
                })
                if (xhr.status === 200) {
                    success(JSON.parse(xhr.responseText))
                } else {
                    error(xhr)
                }
            }
        }
        let formData = new FormData()
        formData.append('uploadfile', e.target.files[0])
        xhr.upload.onprogress = function (e) {
            t.setState({
                now: e.loaded * 100 / e.total
            })
        }
        xhr.open('POST', url, true)
        xhr.send(formData)
        t.setState({
            uploading: true
        })
    }
    render () {
        const t = this
        const {
            uploading,
            now
        } = t.state
        const {
            loop = false
        } = this.props

        return uploading
            ? <ProgressBar active now={now}/>
            : (loop || !now ? <label className="btn btn-primary btn-uploader">
                <input type="file" style={{visibility: 'hidden'}} onChange={t.onChange}/>
            </label> : <Button bsStyle="success"><Glyphicon glyph="ok"/> OK</Button>)
    }
}
