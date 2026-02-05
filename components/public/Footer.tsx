export function Footer() {
    return (
        <footer className="bg-[#001529] text-white py-12">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-[#C5A059] mb-4">NAC.uz</h3>
                    <p className="text-gray-400 text-sm">
                        National Academic Challenge — Where Thinking Becomes Excellence.
                        Nodavlat akademik olimpiada.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold mb-4">Tezkor Havolalar</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="/about" className="hover:text-[#C5A059]">Biz Haqimizda</a></li>
                        <li><a href="/register" className="hover:text-[#C5A059]">Ro‘yxatdan O‘tish</a></li>
                        <li><a href="/results" className="hover:text-[#C5A059]">Natijalar</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4">Hujjatlar</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="/about" className="hover:text-[#C5A059]">Olimpiada Nizomi</a></li>
                        <li><a href="#" className="hover:text-[#C5A059]">Maxfiylik Siyosati</a></li>
                        <li><a href="#" className="hover:text-[#C5A059]">Foydalanish Shartlari</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4">Bog‘lanish</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>+998 97 597 19 45</li>
                        <li>info@nac.uz</li>
                        <li>Sirdaryo viloyati, Guliston shahri</li>
                    </ul>
                </div>
            </div>
            <div className="text-center mt-12 pt-8 border-t border-gray-800 text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} National Academic Challenge. All rights reserved.
            </div>
        </footer>
    )
}
