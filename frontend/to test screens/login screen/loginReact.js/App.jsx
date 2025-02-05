// import React from 'react';
import './App.css';
import {  Box, Flex, Heading, Input, Button, Text } from '@chakra-ui/react';
import  {Provider}  from "@/components/ui/provider.jsx"

function App() {
    return (
        <Provider>
            <Flex direction="column" minH="100vh" className="app-container">
                {/* Header */}
                <Box as="header" className="header">
                    <Heading as="h1" size="lg">Welcome to Our Website</Heading>
                </Box>

                {/* Main Content */}
                <Flex
                    direction={{ base: 'column', md: 'row' }}
                    flex="1"
                    className="main-content"
                >
                    {/* Form Section */}
                    <Flex
                        flex="1"
                        direction="column"
                        justify="center"
                        className="form-section"
                    >
                        <Heading as="h2" size="md" mb={6} className="form-heading">
                            Login
                        </Heading>
                        <form>
                            <Input
                                placeholder="Username"
                                mb={4}
                                className="form-input"
                                required
                            />
                            <Input
                                placeholder="Password"
                                type="password"
                                mb={6}
                                className="form-input"
                                required
                            />
                            <Button type="submit" className="form-button">
                                Login
                            </Button>
                        </form>
                    </Flex>

                    {/* Image Section */}
                    <Box
                        flex="1"
                        className="image-section"
                    ></Box>
                </Flex>

                {/* Footer */}
                <Box as="footer" className="footer">
                    <Text>&copy; 2025 Your Website. All Rights Reserved.</Text>
                </Box>
            </Flex>
        </Provider>
    );
}

export default App;