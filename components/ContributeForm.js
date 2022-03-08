import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import { ethers } from "ethers";
import { Router } from '../routes';

class ContributeForm extends Component {
    state = {
        value: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async event => {

        event.preventDefault();

        const campaign = Campaign(this.props.address);

        this.setState({ loading: true, errorMessage: '' });

        try {   

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const connected = campaign.connect(signer);
            await connected.contribute({value: ethers.utils.parseEther(this.state.value)});

            Router.replaceRoute(`/campaigns/${this.props.address}`)

        } catch (err) {
            this.setState({ errorMessage: err.message});
        }

        this.setState({ loading: false, value: ''});
    };

    render() {
        return(
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        value={this.state.value}
                        onChange={event => this.setState({ value: event.target.value })}
                        label="ether"
                        labelPosition="right"/>
                </Form.Field>

                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button primary loading={this.state.loading}>
                    Contribute!
                </Button>
            </Form>
        );
    }
}

export default ContributeForm;