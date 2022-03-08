import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;
        const campaign = Campaign(address);
        const requestCount = await campaign.getRequestsCount();

        const requests = await Promise.all(
            Array(requestCount)
            .fill()
            .map((element, index) => {
                return campaign.requests(index);
            })
        )
        
        return { address, requests, requestCount };
    }
    render () { 
        const { Header, Row, HeaderCell, Body } = Table;
        return (
            <Layout>
                <h3>Requests</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                <a>
                    <Button primary>Add Request</Button>
                    </a>
                    </Link>
                    <Table>
                        <Header>
                            <Row>
                                <HeaderCell>ID</HeaderCell>
                                <HeaderCell>Description</HeaderCell>
                                <HeaderCell>Amount</HeaderCell>
                                <HeaderCell>Recipient</HeaderCell>
                                <HeaderCell>ApprovalCount</HeaderCell>
                                <HeaderCell>Approve</HeaderCell>
                                <HeaderCell>Finalize</HeaderCell>
                            </Row>
                        </Header>
                        <Body>
                            {this.renderRow()}
                        </Body>
                    </Table>
            </Layout>
        );
    }
}

export default RequestIndex;