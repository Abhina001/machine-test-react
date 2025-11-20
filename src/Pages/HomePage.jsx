
import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from '../redux/countriesSlice';
import SliderComponent from '../components/SliderComponent';
import '../assets/styles/homepage.css'
import MenuIcon from '../assets/icons/menu-icon.svg';
import googleIcon from '../assets/icons/google-icon.svg';
import facebook from '../assets/icons/facebook.svg';
import twitter from '../assets/icons/twitter-icon.svg';
import linkedin from '../assets/icons/linkedin.svg';




export default function HomePage() {
    const dispatch = useDispatch();
    const { items, status } = useSelector(state => state.countries);

    const [region, setRegion] = useState('All');
    const regionArray = ["All", "Asia", "Europe"]
    const [perPage, setPerPage] = useState(8);
    // const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        if (status === 'idle') dispatch(fetchCountries());
    }, [dispatch, status]);



    const filtered = useMemo(() => {
        if (region === 'All') return items;
        return items.filter(c => c.region === region);
    }, [items, region]);

    const visible = filtered.slice(0, perPage);


    return (
        <Container className="home-page">

            <div className="desktop-header d-none d-md-block">
                <Row className="align-items-center desktop-top-row">

                    <Col className="desktop-left">
                        <p className="countries-text-desktop">Countries</p>
                    </Col>

                    <Col xs="auto" className="desktop-right">
                        <div className="region-nav">
                            {regionArray.map(r => (
                                <button
                                    key={r}
                                    className={`region-btn ${region.toLowerCase() === r.toLowerCase() ? "active" : ""
                                        }`}
                                    onClick={() => setRegion(r)}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </Col>

                </Row>

                <Row className="align-items-center mt-3">
                    <Col xs={5} className="d-flex justify-content-end">
                        <div className="left-line"></div>
                    </Col>

                    <Col xs="auto">
                        <h2 className="welcome-title">WELCOME</h2>
                    </Col>

                    <Col xs={5}>
                        <div className="right-line"></div>
                    </Col>
                </Row>
            </div>


            <div className="mobile-header d-md-none">
                <div className="mobile-top-row">
                    <p className="countries-text">Countries</p>

                    <img
                        src={MenuIcon}
                        alt="menu"
                        className="menu-icon"
                    />
                </div>

                <div className="mobile-line"></div>

                <h2 className="mobile-welcome">WELCOME</h2>

                <div className="mobile-line"></div>
            </div>




            <Row className="mb-4">
                <Col md={12}>
                    <SliderComponent
                        items={visible.slice(0, 3)}
                    // onIndexChange={setSlideIndex}
                    />
                </Col>


            </Row>


            <Row>
                {visible.map(c => (
                    <Col key={c.name} md={6} lg={6} className="mb-3">
                        <div className="country-card">
                            <img src={c.flag} alt={c.name} />
                            <div>
                                <h6>{c.name}</h6>
                                <small>{c.region}</small>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
            <div className="text-center my-4">
                {perPage < filtered.length && (
                    <Button className="loadmore-btn" onClick={() => setPerPage(perPage + 8)}>
                        Load More
                    </Button>
                )}
            </div>
            <div className="social-icons bottom-section">
                <img src={googleIcon} alt="google" />
                <img src={facebook} alt="google" />
                <img src={linkedin} alt="google" />
                <img src={twitter} alt="google" />

            </div>

            <div>
                <p>Example@email.com</p>
                <p>Copyright © 2020 Name. All rights reserved.</p>
            </div>
        </Container>

    );
}
