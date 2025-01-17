import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Box, Button, Center, Flex, HStack, Input, Square, Text, Textarea,
} from '@chakra-ui/react';
import { MultiSelect } from 'chakra-multiselect';

const options = [
    { label: 'user1', value: 'user1' },
    { label: 'user2', value: 'user2' },
    { label: 'user3', value: 'user3' },
    { label: 'user4', value: 'user4' },
];

const templateTabs = ['text', 'list', 'context'];

type _Lists = { users: string[]; list: string[] }[];

export function Column({
    _users,
    _list,
    _lists,
    _selected: [selected, setSelected],
    index,
}: {
    _users: string[];
    _list: string[];
    _lists: [_Lists, Dispatch<SetStateAction<_Lists>>];
    _selected: [number[], Dispatch<SetStateAction<number[]>>];
    index: number;
}) {
    const [value, setValue]: any = useState(_users);
    const [templateTab, setTemplateTab] = useState(templateTabs[0]);

    return <Box w='300px' h='100%' bg='white'>
        <Flex direction="column" h="100%">
            <Box bg="gray.300" flex="0">
                <MultiSelect
                    options={options}
                    value={value}
                    onChange={setValue}
                />
                {!!_list[selected[index - 1]] && <Input
                    placeholder='Contain name'
                    value={_lists[0][index - 1].list[selected[index - 1]]}
                    onChange={(e) => {
                        _lists[1](_lists[0].map((l, ii) => ii === index - 1 ? { ...l, list: l.list.map((n, iii) => iii === selected[index - 1] ? e.currentTarget.value : n) } : l));
                    }}
                />}
            </Box>
            {!!index && (<>
                <Box bg="gray.200" flex="0">
                    <Flex>
                        {templateTabs.map(t => (
                            <Button
                                variant={t === templateTab ? "solid" : 'outline'}
                                colorScheme="gray"
                                flex={1}
                                onClick={() => setTemplateTab(t)}
                            >{t}</Button>
                        ))}
                    </Flex>
                </Box>
                <Box bg="gray.200" h="300px" position="relative">
                    <Textarea
                        placeholder={`Template for generation of ${_lists[0][index - 1].list[selected[index - 1]]} with gpt.`}
                        h="100%"
                    />
                    <Flex justify="end" p={3} position="absolute" bottom={0} right={0} zIndex={2}>
                        <Button
                            variant={'outline'}
                            colorScheme="white"
                            size="sm"
                            onClick={() => {
                                confirm(`You sure you want to lost ${templateTab} of ${_lists[0][index - 1].list[selected[index - 1]]} with new generation?`);
                            }}
                        >regenerate</Button>
                    </Flex>
                </Box>
            </>)}
            <Box flex='1' bg='white' overflowY="scroll">
                {_list.map((l, i) => <Flex>
                    <Button
                        variant={i === selected[index] ? 'solid' : 'outline'} flex={1} p={3} w="100%"
                        onClick={() => setSelected([...selected.slice(0, index), i, -1])}
                    >{l}</Button>
                    <Button
                        flex={0} variant="outline"
                        onClick={() => {
                            if (confirm(`Sure delete ${l}?`)) {
                                if (selected[index] === i) {
                                    setSelected([...selected.slice(0, index - 1), i - 1]);
                                }
                                _lists[1](_lists[0].map((l, ii) => ii === index ? { ...l, list: l.list.filter((f, iii) => iii !== i) } : l));
                            }
                        }}
                    >x</Button>
                </Flex>)}
                <Button
                    variant="outline" w={'100%'}
                    onClick={() => {
                        _lists[1](_lists[0].map((l, ii) => ii === index ? { ...l, list: [...l.list, 'new'] } : l));
                        setSelected([...selected.slice(0, index - 1), _lists[0][index].list.length]);
                    }}
                >+</Button>
            </Box>
        </Flex>
    </Box>
}

export function Panel() {
    const _selected = useState([1, 4, 7]);
    const _lists = useState<_Lists>([
        { list: ['Курс 1', 'Курс 2', 'Курс 3'], users: ['user1', 'user3'] },
        { list: ['Лекция 1', 'Лекция 2', 'Лекция 3', 'Лекция 4', 'Лекция 5', 'Лекция 6', 'Лекция 7'], users: ['user4'] },
        { list: ['Слайд 1', 'Слайд 2', 'Слайд 3', 'Слайд 4', 'Слайд 5', 'Слайд 6', 'Слайд 7', 'Слайд 8', 'Слайд 9', 'Слайд 10',], users: ['user5', 'user2'] },
    ]);

    return <Box w="100vw" h="100vh" position="fixed" overflowX="scroll" background="gray.300">
        <HStack spacing={1} h="100%">
            {(_selected[0].length ? _selected[0] : [0]).slice(0, _lists[0].length).map((s, ii) => <Column key={ii} _users={_lists[0][ii].users} _list={_lists[0][ii].list} _selected={_selected} index={ii} _lists={_lists}/>)}
            {/* {_lists[0].map((l, i) => <Column _users={l.users} _list={l.list} _selected={_selected} index={i} _lists={_lists}/>)} */}
        </HStack>
    </Box>
}