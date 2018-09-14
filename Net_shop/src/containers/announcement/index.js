import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Form, FormGroup, FormControl, Col, Checkbox, Button,
} from 'react-bootstrap';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

import { translate } from 'react-i18next';

class AnnoucementAddingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      price: '',
      pictures: [],
    };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  }

  render() {
    const {
      name, description, price,
    } = this.state;
    const { t } = this.props;

    return (
      <Form horizontal className="container">
        <Col xs={6} md={4}>
          <FormGroup controlId="formHorizontalEmail" className="input_component">
            <Col sm={2}>{t('announcement.name')}</Col>
            <Col sm={10}>
              <FormControl type="text" name={name} value={name} placeholder={t('announcement.name')} onChange={e => this.handleChange('name', e.target.value)} />
            </Col>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea" className="input_component">
            <Col sm={2}>{t('announcement.description')}</Col>
            <Col sm={10}>
              <FormControl componentClass="textarea" name={description} value={description} placeholder={t('announcement.name')} onChange={e => this.handleChange('description', e.target.value)} />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword" className="input_component">
            <Col sm={2}>{t('announcement.price')}</Col>
            <Col sm={10}>
              <FormControl type="number" name={price} value={price} placeholder={`${t('announcement.price')} $`} onChange={e => this.handleChange('price', e.target.value)} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Checkbox>Remember me</Checkbox>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword" className="input_component">
            <Col sm={2}>{'   '}</Col>
            <Col sm={10}>
              <ImagesUploader
                url=""
                optimisticPreviews
                onLoadEnd={(err) => {
                  if (err) {
                    console.error(err);
                  }
                }}
                label={t('announcement.add_pictures')}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="primary" bsSize="large" block onClick={() => this.register()}>{t('announcement.add_announcement')}</Button>
            </Col>
          </FormGroup>

        </Col>
      </Form>
    );
  }
}

AnnoucementAddingComponent.propTypes = {
  t: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
  },
  dispatch,
);

export default withRouter(translate('common')(connect(null, mapDispatchToProps)(AnnoucementAddingComponent)));
