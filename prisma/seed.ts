import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient()

const regionsData = [
    {
        name: "Andijon viloyati",
        districts: [
            "Andijon", "Asaka", "Baliqchi", "Bo‘z (Bo‘ston)", "Buloqboshi", "Izboskan",
            "Jalolquduq", "Jalaquduq", "Marhamat", "Oltinko‘l", "Paxtaobod", "Shahrixon",
            "Ulug‘nor", "Xo‘jaobod", "Qo‘rg‘ontepa"
        ]
    },
    {
        name: "Buxoro viloyati",
        districts: [
            "Buxoro", "Vobkent", "Jondor", "Kogon", "Olot", "Peshku", "Romitan",
            "Shofirkon", "Qorovulbozor", "Qorako‘l", "G‘ijduvon"
        ]
    },
    {
        name: "Farg‘ona viloyati",
        districts: [
            "Bag‘dod", "Beshariq", "Buvayda", "Dang‘ara", "Furqat", "Oltiariq",
            "Oxunboboyev (Qo‘shtepa)", "Rishton", "So‘x", "Toshloq", "Uchko‘prik",
            "O‘zbekiston", "Farg‘ona", "Yozyovon", "Quva"
        ]
    },
    {
        name: "Jizzax viloyati",
        districts: [
            "Arnasoy", "Baxmal", "Do‘stlik", "Forish", "Gallaorol", "Jizzax (Sharof Rashidov)",
            "Mirzacho‘l", "Paxtakor", "Yangiobod", "Zafarobod", "Zamin", "Zarbdor"
        ]
    },
    {
        name: "Namangan viloyati",
        districts: [
            "Chortoq", "Chust", "Kosonsoy", "Mingbuloq", "Namangan", "Norin", "Pop",
            "To‘raqo‘rg‘on", "Uchqo‘rg‘on", "Uychi", "Yangiqorg‘on", "Davlatobod (yangi)"
        ]
    },
    {
        name: "Navoiy viloyati",
        districts: [
            "Karmana", "Konimex", "Navbahor", "Nurota", "Tomdi", "Uchquduq", "Xatirchi", "Qiziltepa"
        ]
    },
    {
        name: "Qashqadaryo viloyati",
        districts: [
            "Chiroqchi", "Dehqonobod", "Kasbi", "Kitob", "Koson", "Mirishkor", "Muborak",
            "Nishon", "Shahrisabz", "Qarshi", "Qamashi", "G‘uzor", "Yakkabog‘", "Ko‘kdala (yangi)"
        ]
    },
    {
        name: "Qoraqalpog‘iston Respublikasi",
        districts: [
            "Amudaryo", "Beruniy", "Chimboy", "Ellikqal’a", "Kegeyli", "Mo‘ynoq", "Nukus",
            "Qanliko‘l", "Qorao‘zak", "Qo‘ng‘irot", "Shumanay", "Taxtako‘pir", "To‘rtko‘l",
            "Xo‘jayli", "Bo‘zatov", "Taxiatosh"
        ]
    },
    {
        name: "Samarqand viloyati",
        districts: [
            "Bulung‘ur", "Ishtixon", "Jomboy", "Kattaqo‘rg‘on", "Narpay", "Nurobod",
            "Oqdaryo", "Pastdarg‘om", "Paxtachi", "Poyariq", "Samarqand", "Toyloq",
            "Urgut", "Qo‘shrabot"
        ]
    },
    {
        name: "Sirdaryo viloyati",
        districts: [
            "Boyovut", "Guliston", "Mirzaobod", "Oqoltin", "Sayxunobod", "Sardoba",
            "Sirdaryo", "Xovos", "Shirin", "Guliston shahar"
        ]
    },
    {
        name: "Surxondaryo viloyati",
        districts: [
            "Angor", "Boysun", "Denov", "Jarqo‘rg‘on", "Muzrabot", "Oltinsoy",
            "Qiziriq", "Qumqo‘rg‘on", "Sariosiyo", "Sherobod", "Sho‘rchi", "Termiz",
            "Uzun", "Bandixon (qayta tashkil etilgan)"
        ]
    },
    {
        name: "Toshkent viloyati",
        districts: [
            "Bekobod", "Bo‘ka", "Bo‘stonliq", "Chinoz", "Oqqo‘rg‘on", "Ohangaron",
            "Parkent", "Piskent", "Quyichirchiq", "Toshkent", "O‘rtachirchiq",
            "Yangiyo‘l", "Yuqorichirchiq", "Zangiota"
        ]
    },
    {
        name: "Xorazm viloyati",
        districts: [
            "Bog‘ot", "Gurlan", "Hazorasp", "Shovot", "Urganch", "Xiva", "Xonqa",
            "Yangiariq", "Yangibozor", "Qo‘shko‘pir", "Tuproqqal’a (yangi)"
        ]
    },
    {
        name: "Toshkent shahri",
        districts: [
            "Bektemir", "Chilonzor", "Hamza (Yashnobod)", "Mirobod", "Mirzo Ulug‘bek",
            "Sergeli", "Shayxontohur", "Olmazor", "Uchtepa", "Yakkasaroy", "Yunusobod"
        ]
    }
]

async function main() {
    console.log('Start seeding regions...')
    for (const region of regionsData) {
        const r = await prisma.region.upsert({
            where: { name: region.name },
            update: {},
            create: {
                name: region.name,
                districts: {
                    create: region.districts.map(d => ({ name: d }))
                }
            }
        })
        console.log(`Created region: ${r.name} with ${region.districts.length} districts`)
    }

    // Seed default admin
    // For simplicity using plaintext for demo, but normally hash it.
    // User asked for "Admin login/parol orqali kiradi". I will hardcode one for now.
    const admin = await prisma.adminUser.upsert({
        where: { username: 'nac@gmail.com' },
        update: {
            password: '2Maktabim'
        },
        create: {
            username: 'nac@gmail.com',
            password: '2Maktabim',
            role: 'ADMIN'
        }
    })
    console.log('Created admin user: nac@gmail.com')

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
