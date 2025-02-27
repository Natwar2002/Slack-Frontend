import 'quill/dist/quill.snow.css';

import { ImageIcon, XIcon } from 'lucide-react';
import Quill from 'quill';
import { useEffect, useRef, useState } from 'react';
import { MdSend } from 'react-icons/md';
import { PiTextAa } from 'react-icons/pi';

import { Button } from '@/components/ui/button';

import { Hint } from '../Hint/Hint';

export const Editor = ({ variant = 'create', onSubmit, onCancel, placeholder, disabled, defaultValue }) => {

    const [isToolbarVisible, setIsToolbarVisible] = useState(false);
    const [image, setImage] = useState(null);

    const imageInputRef = useRef(null);
    const containerRef = useRef();
    const placeholderRef = useRef(placeholder);
    const defaultValueRef = useRef(defaultValue);
    const quillRef = useRef();

    function toggleToolbar() {
        setIsToolbarVisible(!isToolbarVisible);
        const toolbar = containerRef.current.querySelector('.ql-toolbar');
        if(toolbar) {
            toolbar.classList.toggle('hidden');
        }
    }

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
                    ['link'],
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
            <div className="flex flex-col border-slate-300 rounded-md overflow-hidden focus-within:shadow-sm focus-within:border-slate-400 bg-white">
                <div className='h-full ql-custom' ref={containerRef} />
                {
                    image && (
                        <div className='relative size-[60px] flex items-center justify-center group/image'>
                            <button 
                                className='hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[5] border-2 border-white items-center justify-center'
                                onClick={() => {
                                    setImage(null);
                                    imageInputRef.current.value = '';
                                }}
                            >
                                <XIcon className='size-4' />
                            </button>
                            <img src={URL.createObjectURL(image)} className='rounded-xl overflow-hidden border object-cover' />
                        </div>
                    )
                }
                <div className='flex px-2 pb-2 z-[5]'>
                    <Hint label={isToolbarVisible ? 'Show toolbar' : 'Hide toolbar'}> 
                        <Button 
                            size='iconSm' 
                            onClick={toggleToolbar}
                            variant='ghost'
                            disabled={false}
                        >
                            <PiTextAa className='size-4' />
                        </Button>
                    </Hint>

                    <Hint label={'Image'}>
                        <Button 
                            size='iconSm' 
                            onClick={() => {
                                imageInputRef?.current?.click();
                            }}
                            variant='ghost'
                            disabled={false}
                        >
                            <ImageIcon className='size-4' />
                        </Button>
                    </Hint>

                    <input 
                        type='file' 
                        className='hidden' 
                        ref={imageInputRef}
                        onChange={(e) => setImage(e.target.files[0])} 
                    />

                    <Hint
                        label={'Send message'}
                    >
                        <Button
                            size='iconSm'
                            className='ml-auto bg-[#007a6a] hover:bg-[#007a6a]/80 text-white'
                            onClick={() => {
                                const messageContent = JSON.stringify(quillRef.current?.getContents());
                                onSubmit({ body:  messageContent, image });
                                quillRef?.current?.setText('');
                                setImage(null);
                                imageInputRef.current.value = '';
                            }}
                            disabled={false}
                        >
                            <MdSend className='size-4' />
                        </Button>
                    </Hint>
                </div>
            </div>
            <p className='p-2 text-[10px] text-muted-foreground flex justify-end'>
                <strong>Shift + return </strong> &nbsp; to add a new line
            </p>
        </div>
    );
};