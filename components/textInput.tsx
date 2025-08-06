
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import type { ColorValue, StyleProp, TextStyle } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export type CustomTextInputHandle = {
    focus: (() => void) | undefined;
    blur: (() => void) | undefined;
}

type textInputProps = {
    /** If false, text is not editable.
     *  Default is true.
     *  Has no effect if hasEditLock is set to true.
     */
    editable?: boolean

    /**
     * If true, editable is handled internally,
     * and editable state is managed with focusing and bluring.
     */
    hasEditLock?: boolean

    /** 
     * Callback that is called when the text input is focused
     */
    onFocus?: () => void

    /** 
     * Callback that is called when the text input is focused
     */
    onBlur?: () => void

    /**
     * Callback to set the value in storage upon text submission
     * @param text
     */
    setStorageValue: (text: string) => void

    /**
     * If true, submits text to storage when the input is blurred
     */
    submitOnBlur?: boolean

    /**
     * The string that will be rendered before text input has been entered
     */
    placeholderText?: string

    /**
     * The text color of the placeholderText
     */
    placeholderColor?: ColorValue

    /**
     * React hook that uses a value from storage
     * @returns A string or undefined value
     */
    storageHook: () => any

    /** Styles */
    style?: StyleProp<TextStyle>

    /** If true, the text input can wrap to multiple lines.
     * The default value is false
     */
    textWrap?: boolean
}

const CustomTextInput = forwardRef<CustomTextInputHandle, textInputProps>(({
    storageHook,
    setStorageValue,
    onFocus,
    onBlur,
    editable = true,
    style,
    placeholderText,
    placeholderColor,
    textWrap = true,
    hasEditLock = false,
}, ref) => {
    const referenceText = (storageHook?.() ?? "Error fetching stored data") as string;
    const [text, setText] = useState(referenceText);
    const [isEditable, setIsEditable] = useState(hasEditLock);
    const baseRef = useRef<TextInput>(null);

    const compoundEditable = hasEditLock ? isEditable : editable;

    function submitText() {
        const submissionText = text.trim();
        if (submissionText) {
            setStorageValue(submissionText),
                setIsEditable(false);
        }
        else setText(referenceText);
    }

    function compoundFocus() {
        if (hasEditLock)
            setIsEditable(true);
        onFocus?.();
    }

    function compoundBlur() {
        if (hasEditLock)
            setIsEditable(false);
        onBlur?.();
    }

    useImperativeHandle(ref, () => ({
        focus: baseRef.current?.focus,
        blur: baseRef.current?.blur,
    }));

    useEffect(() => {
        setText(referenceText);
    },[referenceText]);

    return (
        <TextInput
            ref={baseRef}
            value={text}
            editable={compoundEditable}
            onChangeText={setText}
            onSubmitEditing={submitText}
            onFocus={compoundFocus}
            onBlur={compoundBlur}
            style={[{padding: 0},style]}
            placeholder={placeholderText}
            placeholderTextColor={placeholderColor}
            multiline={textWrap}
            scrollEnabled={false}
            submitBehavior="blurAndSubmit"
        />
    )
});

export default CustomTextInput;