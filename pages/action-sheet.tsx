import React, { useEffect, useState } from 'react';
import { useLocalStore } from '@deep-foundation/store/local';
import {
  DeepProvider,
  useDeep,
} from '@deep-foundation/deeplinks/imports/client';

import {
  Button,
  ChakraProvider,
  Code,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { Provider } from '../imports/provider';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import {
  ActionSheet,
  ActionSheetButton,
  ActionSheetButtonStyle,
  ShowActionsOptions,
} from '@capacitor/action-sheet';
import { insertActionSheetToDeep } from '../imports/action-sheet/insert-action-sheet-to-deep';
import { PACKAGE_NAME } from '../imports/action-sheet/package-name';
import { useActionSheetSubscription } from '../imports/action-sheet/use-action-sheet-subscription';

const defaultOption: ActionSheetButton = {
  title: 'Action Sheet Option Title',
  style: ActionSheetButtonStyle.Default,
};
const defaultActionSheet: ShowActionsOptions = {
  title: 'Title',
  message: 'Message',
  options: [
    {
      title: 'OptionTitle1',
    },
    {
      title: 'OptionTitle2',
    },
    {
      title: 'OptionTitle3',
      style: ActionSheetButtonStyle.Destructive,
    },
  ],
};

function Content() {
  const deep = useDeep();
  const [deviceLinkId, setDeviceLinkId] = useLocalStore(
    'deviceLinkId',
    undefined
  );
  useEffect(() => {
    defineCustomElements(window);
    self['ActionSheet'] = ActionSheet;
    self['ActionSheetButtonStyle'] = ActionSheetButtonStyle;
  }, []);

  // useEffect(() => {
  //   new Promise(async () => {
  //     deep.minilinks.apply([
  //       await deep.id("@deep-foundation/core", "Contain"),
  //       await deep.id(PACKAGE_NAME, "ActionSheet"),
  //       await deep.id(PACKAGE_NAME, "ActionSheetTitle"),
  //       await deep.id(PACKAGE_NAME, "ActionSheetMessage"),
  //       await deep.id(PACKAGE_NAME, "ActionSheetOption"),
  //       await deep.id(PACKAGE_NAME, "ActionSheetResultIndex"),
  //       await deep.id(PACKAGE_NAME, "Notify"),
  //       await deep.id(PACKAGE_NAME, "Notified"),
  //     ])
  //   })
  // }, []);

  useActionSheetSubscription({deep, deviceLinkId})
  
  const [actionSheetToInsert, setActionSheetToInsert] = useState<string>(
    JSON.stringify(defaultActionSheet, null, 2)
  );

  // const [actionSheetTitle, setActionSheetTitle] = useState<string | undefined>("Title");
  // const [actionSheetMessage, setActionSheetMessage] = useState<string | undefined>("Message");
  // const [actionSheetOptions, setActionSheetOptions] = useState<ActionSheetButton[] | undefined>([defaultOption, defaultOption, defaultOption]);
  // const [actionSheetOptionInputsCount, dispatchActionSheetOptionInputsCount] = useReducer((state, action) => {
  //   if (action.type === "++") {
  //     return ++state;
  //   } else {
  //     return --state;
  //   }
  // }, 0);

  return (
    <Stack>
      {/* <Input value={actionSheetTitle} onChange={async (event) => {
        setActionSheetTitle(event.target.value)
      }}></Input>
      <Input value={actionSheetMessage} onChange={async (event) => {
        setActionSheetMessage(event.target.value)
      }}></Input>
      <Button onClick={async () => {
        setActionSheetOptions((oldActionSheets) => {
          const newOptions = oldActionSheets ? [...oldActionSheets, defaultOption] : [defaultOption];
          return newOptions
        })
      }}>++ Action Sheet Option</Button>
      <Button isDisabled={!actionSheetOptions} onClick={async () => {
        setActionSheetOptions((oldActionSheets) => {
          const newActionSheets = [...oldActionSheets]
          newActionSheets.pop();
          return newActionSheets
        })
      }}>-- Action Sheet Option</Button>
      {
        actionSheetOptions && actionSheetOptions.map((actionSheetOption, i) => (
          <Box key={i}>
            <Input value={actionSheetOption.title} onChange={async (event) => {
              setActionSheetOptions((oldActionSheets) => {
                const newActionSheets = [...oldActionSheets];
                const newActionSheet = actionSheetOption;
                newActionSheet.title = event.target.value;
                newActionSheets[i] = newActionSheet;
                return newActionSheets;
              })
            }}></Input>
            <RadioGroup value={actionSheetOption.style} onChange={async (value) => {
              setActionSheetOptions((oldActionSheets) => {
                const newActionSheets = [...oldActionSheets];
                const newActionSheet = actionSheetOption;
                newActionSheet.style = ActionSheetButtonStyle[value];
                newActionSheets[i] = newActionSheet;
                return newActionSheets;
              })
            }}>
              <Radio value={ActionSheetButtonStyle.Cancel} title={ActionSheetButtonStyle.Cancel}>{ActionSheetButtonStyle.Cancel}</Radio>
              <Radio value={ActionSheetButtonStyle.Default} title={ActionSheetButtonStyle.Default}>{ActionSheetButtonStyle.Default}</Radio>
              <Radio value={ActionSheetButtonStyle.Destructive} title={ActionSheetButtonStyle.Destructive}>{ActionSheetButtonStyle.Destructive}</Radio>
            </RadioGroup>


          </Box>
        ))
      }
      <Button onClick={async () => {
        await insertActionSheetToDeep({
          deep, containInLinkId: deep.linkId, actionSheetData: {
            title: actionSheetTitle,
            message: actionSheetMessage,
            options: actionSheetOptions
          }
        })
      }}>Insert Action Sheet</Button> */}
      <Textarea value={actionSheetToInsert} rows={30} />
      <Button
        onClick={async () => {
          insertActionSheetToDeep({
            deep,
            containInLinkId: deep.linkId,
            actionSheetData: JSON.parse(actionSheetToInsert),
          });
        }}
      >
        Insert Action Sheet
      </Button>
      <Text>
        Insert Notify link from ActionSheet to Device. You should see
        action-sheet on your page after that and result will be saved to deep.
      </Text>
      <Code display={'block'} whiteSpace={'pre'}>
        {`
await deep.insert({
    type_id: await deep.id("${PACKAGE_NAME}", "Notify"),
    from_id: actionSheetLinkId, 
    to_id: deviceLinkId, 
    in: {data: {type_id: await deep.id("@deep-foundation/core", "Contain"), from_id: deep.linkId}}
})
  `}
      </Code>
    </Stack>
  );
}

export default function ActionSheetPage() {
  return (
    <ChakraProvider>
      <Provider>
        <DeepProvider>
          <Content />
        </DeepProvider>
      </Provider>
    </ChakraProvider>
  );
}
