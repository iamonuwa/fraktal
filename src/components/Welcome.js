/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styled from "styled-components";
import { rlcPrice, refreshPriceUrl } from '../constants.js';

const Section = styled.section`
  border-style: dashed;
  border-width: 1px
  border-radius: 6px;
  a {
    color: #000;
    text-decoration: underline;
    &:focus: {
      color: #000 !important;
    }
    &:hover: {
      color: #000 !important;
    }
    &:active: {
      color: #000 !important;
    }
  }
`;

const Container = styled.div`
  padding: 15px 5px;
`;

const Header = styled.h5`
  font-weight: 600;
  font-size: 16px;
`;

const Paragraph = styled.p`
  text-align: left;
  padding: 10px 10px 0 10px;
`;

const Bold = styled.span`
  font-weight: 600;
`;

export default class Welcome extends React.Component {
  state = {
    price: null,
    currency: 'USD'
  }

  constructor(props) {
    super(props)
    this.state = { 
      currency: 'USD',
      price: null
    }
  }

  componentDidMount() {
    this.refreshPrice()
  }

  refreshPrice() {
    fetch(refreshPriceUrl + this.state.currency).then(response => {
      return response.json()
    }).then(json => {
      console.log(json.price)
      this.setState({ price: (parseFloat(json.price) * rlcPrice ).toFixed(2) })
    }).catch(error => console.log(error))
  }

  render() {
    return (
      <Section>
        <Container>
          <Header>Welcome to Fraktal app!</Header>
          <Paragraph>
            For the price of {this.state.currency} { this.state.price ? this.state.price : '...' }, get a beautiful drawing based on{" "}
            <a href="#" target="_blank" rel="no-referrer">
              Cliff Pickover’s
            </a>{" "}
            work: <Bold>gorgeous custom fractal rendenrings are awesome!</Bold> The
            drawing app is executed in a fully distributed way and the result is
            delivered to a decentralized storage system.{" "}
            <a href="http://iex.ec/" target="_blank" rel="no-referrer">
              iExec
            </a>{" "}
            uses the{" "}
            <a href="https://ethereum.org" target="_blank" rel="no-referrer">
              Ethereum
            </a>{" "}
            blockchain to process payment and run its consensus algorithm called{" "}
            <a href="#" target="_blank" rel="no-referrer">
              PoCo
            </a>
            ; when you pay, you’re guaranteed to obtain your HD file at the
            indicated{" "}
            <a href="https://ipfs.io" target="_blank" rel="no-referrer">
              IPFS
            </a>{" "}
            address.
          </Paragraph>
          <Paragraph>
            <Bold>
              Make sure your Metamask wallet is loaded with at least 0.00003 ETH and
              300 nRLC.
            </Bold>
          </Paragraph>
          <Paragraph>Please leave us your feedbacks!</Paragraph>
        </Container>
      </Section>
    )
  }
}
