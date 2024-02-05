import React, { useEffect } from 'react';
import {
  Text,
  Link,
  Stack,
  Card,
  CardBody,
  Heading,
  CardHeader,
  ColorModeScript,
} from '@chakra-ui/react';
import {
  DeepClient,
} from '@deep-foundation/deeplinks/imports/client';
import { NavBar } from '../src/react/components/navbar';
import { Page } from '../src/react/components/page';
import { Panel } from '../imports/panel';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import {  MultiSelectTheme } from 'chakra-multiselect';

interface ContentParam {
  deep: DeepClient;
}

function Content({ deep }: ContentParam) {
  return (
    <Stack alignItems={'center'}>
      <NavBar />
      <Heading as={'h1'}>Sdk</Heading>
      <Card>
      <CardHeader>
        <Heading as={'h2'}>General Info</Heading>
      </CardHeader>
      <CardBody>
        <Text suppressHydrationWarning>
          Authentication Link Id: {deep.linkId ?? ' '}
        </Text>
      </CardBody>
    </Card>
    </Stack>
  );
}

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme
  }
});

export default function IndexPage() {
  // return (
  //   <Page
  //     renderChildren={({ deep }) => (
  //       <Content deep={deep} />
  //     )}
  //   />
  // );
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode='light' />
      <Panel/>
    </ChakraProvider>
  );
}

