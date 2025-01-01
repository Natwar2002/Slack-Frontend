import Quill from 'quill';
import { useEffect, useRef, useState } from 'react';

export const Editor = ({ variant = 'create', onSubmit, onCancel, placeholder, disabled, defaultValue }) => {

    const [text, setText] = useState('');
    const [isToolbarVisible, setToolbarVisible] = useState(false);

    const containerRef = useRef();
    const submitRef = useRef();
    const disableRef = useRef();
    const placeholderRef = useRef();
    const defaultValueRef = useRef();
    const quillRef = useRef();

    useEffect(()=> {
        if(!containerRef.current) return;
        const container = containerRef.current;
        const editorContainer = container.appendChild(container.ownerDocument.createElement('div'));

        const options = {
            theme: 'snow',
            placeholder: placeholderRef.current,
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['link', 'image'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['clean']
                ],
                keyboard: {
                    binidings: {
                        enter: {
                            key: 'Enter',
                            handler: () => { 
                                return; 
                            }
                        },
                        shift_enter: {
                            key: 'Enter',
                            shiftKey: true,
                            handler: () => {
                                quill.insertText(quill.getSelection()?.index || 0, '\n');
                            }
                        }
                    }
                }
            }
        };

        const quill = new Quill(editorContainer, options);

        quillRef.current = quill;
        quillRef.current.focus();

        quill.setContents(defaultValueRef.current);

    }, []);

    return(
        <div className="flex flex-col">
            <div className="flex flex-col border-slate-300 rounded-md overflow-hidden focus-within:shadow-sm focus-within:border-slate-400 bg-white transition focus-within:">
                <div ref={containerRef} />
            </div>
        </div>
    );
};