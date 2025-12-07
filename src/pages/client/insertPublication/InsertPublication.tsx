import { useState } from "react";
import MarkdownEditor from "./components/MarkdownEditor";
import TagInput from "./components/TagInput";
import FileUpload from "./components/DragAndDrop";
import categorys from "../home/categorys.json";
import { Icon } from "@iconify/react";
import LocationPicker from "./components/LocationPicker";

export default function InsertPublication() {
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    
    const titleLength = title.length;
    const isTitleValid = titleLength >= 8 && titleLength <= 150;
    const descriptionLength = description.length;
    const isDescriptionValid = descriptionLength >= 10 && descriptionLength <= 1500;
    
    const isFormValid = isTitleValid && isDescriptionValid && selectedCategory !== null;

    return (
        <div className="container mx-auto my-25 px-4 sm:px-0">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-8">
                <div className="text-center">
                    <p className="text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em] text-gray-800">Crear Nueva Publicación</p>
                    <p className="text-gray-500 mt-2">Comparte algo nuevo con tu ciudad.</p>
                </div>
                <form className="space-y-6">
                    <div>
                        <label className="flex flex-col min-w-40 flex-1" htmlFor="post-title">
                            <div className="flex justify-between items-baseline pb-2">
                                <p className="text-gray-800 text-md font-medium leading-normal">
                                    Título de la publicación *
                                </p>
                                <span className="text-sm text-gray-500">{titleLength} / 150</span>
                            </div>

                            <input id="post-title" placeholder="Introduce el título (máx 150 caracteres)" required
                                value={title}
                                maxLength={150}
                                onChange={e => setTitle(e.target.value)}
                                className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden 
                                rounded-lg text-gray-800 focus:outline-0 focus:ring-2 
                                focus:ring-blue-200 border border-gray-300 bg-white 
                                focus:border-blue-800 placeholder:text-gray-400 
                                px-3 py-3 text-sm leading-tight ${!isTitleValid && titleLength > 0 ? 'border-red-600' : ''}`}
                            />
                        </label>
                        {!isTitleValid && titleLength > 0 && (
                            <p className="text-xs text-red-600 pt-2">El título debe tener entre 8 y 150 caracteres.</p>
                        )}
                    </div>

                    <div>
                        <label className="flex flex-col min-w-40 flex-1" htmlFor="post-description">
                            <div className="flex justify-between items-baseline pb-2">
                                <p className="text-gray-800 text-base font-medium leading-normal">
                                    Descripción *
                                </p>
                                <span className={`text-sm ${!isDescriptionValid && descriptionLength > 0 ? 'text-red-600' : 'text-gray-500'}`}>{descriptionLength} / 1500</span>
                            </div>
                            <div className={`rounded-lg border ${!isDescriptionValid && descriptionLength > 0 ? 'border-red-600' : 'border-gray-300'} focus-within:ring-2 focus-within:ring-blue-200 focus-within:border-blue-800 overflow-hidden`}>
                                <MarkdownEditor value={description} fieldChange={setDescription} />
                            </div>
                            {!isDescriptionValid && descriptionLength > 0 && (
                                <p className="text-xs text-red-600 pt-2">La descripción debe tener entre 10 y 1500 caracteres.</p>
                            )}
                        </label>
                    </div>

                    <div>
                        <h3 className="text-gray-800 text-base font-medium leading-tight pb-2">Categoría *</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {categorys.map((cat) => (
                                <button
                                    key={cat.idCategory}
                                    onClick={() => setSelectedCategory(cat.idCategory)}
                                    className={`flex flex-col items-center justify-center gap-2 p-4 border rounded-lg transition-all group ${
                                        selectedCategory === cat.idCategory 
                                            ? 'border-blue-500 bg-blue-100 text-blue-700' 
                                            : 'border-gray-300 hover:border-blue-300 hover:bg-blue-100'
                                    }`}
                                    type="button"
                                >
                                    <Icon icon={cat.icon} className="text-3xl transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
                                    <span className="text-sm font-medium">{cat.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <LocationPicker
                        defaultLocation={{ lat: -12.046374, lng: -77.042793 }}
                    />
                    <FileUpload
                        maxFiles={4}
                        maxSizeInMB={1}
                        acceptedFormats={['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'video/mp4', 'video/webm']}
                    />
                    <div>
                        <label className="flex flex-col min-w-40 flex-1" htmlFor="post-tags" >
                            <p className="text-gray-800 text-base font-medium leading-normal pb-2">Etiquetas <span className="text-gray-500 text-sm">(opcional)</span></p>
                            <TagInput />
                        </label>
                    </div>
                    <div className="pt-4 flex justify-end">
                        <button 
                            disabled={!isFormValid}
                            className={`flex min-w-[120px] max-w-[480px] items-center justify-center overflow-hidden rounded-sm px-4 py-2 text-base font-bold leading-normal tracking-[0.015em] transition-colors ${
                                isFormValid 
                                    ? 'bg-primary text-white cursor-pointer hover:bg-primary/90' 
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`} 
                            type="submit"
                        >
                            <span>Publicar</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}