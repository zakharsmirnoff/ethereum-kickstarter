import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/layout';
import factory from '../../ethereum/factory';
import { ethers } from "ethers";
import { Router } from '../../routes';

class CampaignNew extends Component {

    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const connected = factory.connect(signer);
            await connected.createCampaign(this.state.minimumContribution)
            
            Router.pushRoute('/');
        }  
        catch (err) {
            this.setState({ errorMessage: err.message });
        };

        this.setState({ loading: false });
    };

    onClick = async (event) => {
        event.preventDefault();
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    }

    render() {
        return (
        <Layout>
        <h3>Create a Campaign</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
                <label>Minimum contribution</label>
                <Input 
                    label="wei" 
                    labelPosition="right"
                    value={this.state.minimumContribution}
                    onChange={event => this.setState({ minimumContribution: event.target.value })}
                    />
            </Form.Field>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button loading={this.state.loading} primary>Create!</Button>
        </Form>
        <hr/>
        <Button onClick={this.onClick} floated="right" primary>Enable Metamask</Button>
        </Layout>
        );
    };
};

export default CampaignNew;