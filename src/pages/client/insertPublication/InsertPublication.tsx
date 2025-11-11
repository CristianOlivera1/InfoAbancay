export default function InsertPublication() {
    return (
        <div className="container mx-auto my-25">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-8">
                <div className="text-center">
                    <p className="text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em] text-[#111518]">Crear Nueva Publicación</p>
                    <p className="text-gray-500 mt-2">Comparte algo nuevo con tu ciudad.</p>
                </div>
                <form className="space-y-6">
                    <div>
                        <label className="flex flex-col min-w-40 flex-1" htmlFor="post-title">
                            <div className="flex justify-between items-baseline pb-2">
                                <p className="text-[#111518] text-base font-medium leading-normal">Título de la publicación * </p>
                                <span className="text-sm text-gray-500">100 / 150</span>
                            </div>
                            <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111518] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe1e6] bg-white focus:border-primary  h-14 placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal" id="post-title" placeholder="Introduce el título (máx 150 caracteres)" required />
                        </label>
                        <p className="text-sm text-green-600 mt-1">Título válido.</p>
                    </div>
                    <div>
                        <label className="flex flex-col min-w-40 flex-1" htmlFor="post-description">
                            <div className="flex justify-between items-baseline pb-2">
                                <p className="text-[#111518] text-base font-medium leading-normal">Descripción o contenido principal *</p>
                                <span className="text-sm text-gray-500">250 / 2000</span>
                            </div>
                            <div className="rounded-lg border border-[#dbe1e6] focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary  overflow-hidden">
                                <div className="flex items-center gap-2 p-2 border-b border-[#dbe1e6] bg-gray-50/50">
                                    <button className="p-1.5 rounded hover:bg-gray-200" type="button"><span className="material-symbols-outlined text-base">format_bold</span></button>
                                    <button className="p-1.5 rounded hover:bg-gray-200" type="button"><span className="material-symbols-outlined text-base">format_italic</span></button>
                                    <button className="p-1.5 rounded hover:bg-gray-200" type="button"><span className="material-symbols-outlined text-base">format_list_bulleted</span></button>
                                    <button className="p-1.5 rounded hover:bg-gray-200" type="button"><span className="material-symbols-outlined text-base">link</span></button>
                                </div>
                                <textarea className="form-textarea w-full min-w-0 flex-1 resize-y overflow-hidden rounded-b-lg text-[#111518] focus:outline-0 focus:ring-0 border-0 bg-white min-h-36 placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal" id="post-description" placeholder="Añade una descripción detallada..." required></textarea>
                            </div>
                        </label>
                    </div>
                    <div>
                        <h3 className="text-[#111518] text-base font-medium leading-tight pb-2">Categoría *</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            <button className="flex flex-col items-center justify-center gap-2 p-4 border rounded-lg hover:border-primary hover:bg-primary/10 transition-all border-gray-300" type="button">
                                <span className="material-symbols-outlined text-primary text-3xl">newspaper</span>
                                <span className="text-sm font-medium text-[#111518]">Noticias</span>
                            </button>
                            <button className="flex flex-col items-center justify-center gap-2 p-4 border-2 rounded-lg transition-all border-primary bg-primary/10" type="button">
                                <span className="material-symbols-outlined text-primary text-3xl">event</span>
                                <span className="text-sm font-medium text-primary">Eventos</span>
                            </button>
                            <button className="flex flex-col items-center justify-center gap-2 p-4 border rounded-lg hover:border-primary hover:bg-primary/10 transition-all border-gray-300" type="button">
                                <span className="material-symbols-outlined text-primary text-3xl">campaign</span>
                                <span className="text-sm font-medium text-[#111518]">Denuncias</span>
                            </button>
                            <button className="flex flex-col items-center justify-center gap-2 p-4 border rounded-lg hover:border-primary hover:bg-primary/10 transition-all border-gray-300" type="button">
                                <span className="material-symbols-outlined text-primary text-3xl">work</span>
                                <span className="text-sm font-medium text-[#111518]">Empleo</span>
                            </button>
                            <button className="flex flex-col items-center justify-center gap-2 p-4 border rounded-lg hover:border-primary hover:bg-primary/10 transition-all border-gray-300" type="button">
                                <span className="material-symbols-outlined text-primary text-3xl">sell</span>
                                <span className="text-sm font-medium text-[#111518]">Publicidad</span>
                            </button>
                            <button className="flex flex-col items-center justify-center gap-2 p-4 border rounded-lg hover:border-primary hover:bg-primary/10 transition-all border-gray-300" type="button">
                                <span className="material-symbols-outlined text-primary text-3xl">more_horiz</span>
                                <span className="text-sm font-medium text-[#111518]">Otros</span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="flex flex-col min-w-40 flex-1" htmlFor="post-location">
                            <p className="text-[#111518] text-base font-medium leading-normal pb-2">Ubicación <span className="text-gray-500 text-sm">(opcional)</span> </p>
                            <div className="relative">
                           
                                <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111518] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe1e6] bg-white focus:border-primary  h-14 placeholder:text-gray-400 pl-11 p-[15px] text-base font-normal leading-normal" id="post-location" placeholder="Ej: Calle Principal 123, Centro" />
                            </div>
                        </label>
                    </div>
                    <div>
                        <h3 className="text-[#111518] text-base font-medium leading-tight pb-2">Imágenes <span className="text-gray-500 text-sm">(Max 5 archivos)</span></h3>
                        <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:bg-gray-50">
                            <span className="material-symbols-outlined text-4xl text-gray-400 ">upload_file</span>
                            <p className="mt-2 text-sm text-gray-500"><span className="font-semibold text-primary">Haz clic para subir</span> o arrastra y suelta</p>
                            <p className="text-xs text-gray-500 ">PNG, JPG, GIF hasta 10MB</p>
                        </div>
                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            <div className="relative group">
                                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg" data-alt="Uploaded image thumbnail 1" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDkg1q9yhUDdchqs2KrbAO6cTizOPINNXRyuqQ2rPrJOTHMqpXma0d8csBMVG-OB3hqkMK64c595ACWAUCowSJQrnfouQrpFfmeJKbwR58ktq0G5FrHXTS6B0sxOEeFGgwpFoXof3-Ch7Uvzk6oX3p7y-quml_70aCQ6rszYu7Bl1pCiqDFtwTV9XL58zU3YM21Went-8gZpqH-68B97lJiPbbGZ-z74uPaO2TW_1HIx6eVoEKIsPl6qYpTK1GrJgAFeLLJdBej6sll")' }}></div>
                                <button className="absolute top-1.5 right-1.5 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="material-symbols-outlined text-sm">close</span>
                                </button>
                            </div>
                            <div className="relative group">
                                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg " data-alt="Uploaded image thumbnail 2" style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCIGObYHMpknFIKW0rHYhm05dbNo-dOe_sX1nmOqrt7TEy1NJiYg7MEBA7KX8LPFeyC967792zAY2fLlNpRx9STo130ONQxBasZka8vG0-47TNHQKdvPQAW_1_VwOIfSWCIZKopZ8VV7aVPXbN6VfHMX1YK429ebhPeeExMyHV5iNiAdkuF-8K-3YJKmrCnW61UFFn0sro9u56YCJq4iEuu8sdIkdh_xRKqZ4t9aOuy8fgf-KFS7dMDVsJR6WQ4h-SU2kukMNfcysah")'
                                }}
                                ></div>
                                <button className="absolute top-1.5 right-1.5 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="material-symbols-outlined text-sm">close</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="flex flex-col min-w-40 flex-1" htmlFor="post-tags">
                            <p className="text-[#111518] text-base font-medium leading-normal pb-2">Etiquetas <span className="text-gray-500 text-sm">(opcional)</span></p>
                            <div className="flex flex-wrap items-center gap-2 p-3 border border-[#dbe1e6] bg-white rounded-lg focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary ">
                  
                                <input className="form-input flex-1 min-w-[100px] border-0 bg-transparent p-0 focus:ring-0 text-[#111518] placeholder:text-gray-400" id="post-tags" placeholder="Añadir etiqueta..." />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Separa las etiquetas con comas o pulsando Enter.</p>
                        </label>
                    </div>
                    <div className="pt-4 flex justify-end">
                        <button className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors disabled:bg-gray-300  disabled:cursor-not-allowed" type="submit">
                            <span className="truncate">Publicar</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}