import {Colors} from "react-native/Libraries/NewAppScreen";
import {Button, TextInput} from "react-native";
import React, {useState} from "react";
import Encoder from 'react-native-fast-encoder';
import SectionContainer from "../components/SectionContainer";
import SectionTitle from "../components/SectionTitle";
import SectionResult from "../components/SectionResult";
import Container from "../components/Container";

interface Props {
    testVal: string,
    intArr: number[]
}

export default function ({testVal, intArr}: Props) {

    const [input, setInput] = useState('');
    const [encrypted, setEncrypted] = useState('');
    const [decrypted, setDecrypted] = useState('');

    return <Container testID={'encrypt-decrypt'}>
        <SectionContainer testID={'encrypt'}>
            <SectionTitle>Encrypt</SectionTitle>
            <TextInput
                value={input}
                testID={'message'}
                onChangeText={(text) => {
                    setInput(text);
                }}
                style={{backgroundColor: Colors.white, borderRadius: 4}}
                placeholder={"insert message here"}
            />
            <Button
                title={"Encrypt"}
                testID={'button'}
                onPress={() => {
                    Encoder.encode(input);
                    setEncrypted('Good');
                }}
            />
            {!!encrypted && <SectionResult testID={'result'}>{encrypted}</SectionResult>}
        </SectionContainer>
        {!!encrypted && (
            <SectionContainer testID={'decrypt'}>
                <SectionTitle>Decrypt</SectionTitle>
                <Button
                    title={"Decrypt"}
                    testID={'button'}
                    onPress={() => {
                        const output = Encoder.decode(
                            intArr
                        );
                        setDecrypted(output.toString());
                    }}
                />
                {!!decrypted && (
                    <SectionResult testID={'result'}>
                        {decrypted}
                    </SectionResult>
                )}
            </SectionContainer>
        )}
    </Container>;
}
