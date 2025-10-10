import { prisma } from "../src/config/prisma.js";

async function main() {
    console.log('🌱 Démarrage du seeder avec UUIDs constants...')

    // --- ROLES ---
    const roles = [
        // -- Organization --
        {
            id: '11111111-1111-1111-1111-111111111111',
            name: 'CEO / Fondateur',
            scope: 'ORGANIZATION',
            description: 'Dirige l’entreprise, définit la vision stratégique et prend les décisions clés.',
        },

        // Développement
        {
            id: '11111111-1111-1111-1111-111111111112',
            name: 'Chef Développeur',
            scope: 'ORGANIZATION',
            description: 'Supervise l’équipe de développement et valide les choix techniques.',
        },
        {
            id: '11111111-1111-1111-1111-111111111113',
            name: 'Développeur',
            scope: 'ORGANIZATION',
            description: 'Développe les fonctionnalités du produit, côté frontend ou backend.',
        },

        // Design
        {
            id: '11111111-1111-1111-1111-111111111114',
            name: 'Chef Designer UI/UX',
            scope: 'ORGANIZATION',
            description: 'Supervise la conception de l’interface et de l’expérience utilisateur.',
        },
        {
            id: '11111111-1111-1111-1111-111111111115',
            name: 'Designer UI/UX',
            scope: 'ORGANIZATION',
            description: 'Conçoit l’interface et l’expérience utilisateur pour le produit.',
        },

        // Sécurité
        {
            id: '11111111-1111-1111-1111-111111111116',
            name: 'Chef Cyber Sécuriste',
            scope: 'ORGANIZATION',
            description: 'Supervise la sécurité des systèmes et la protection des données.',
        },
        {
            id: '11111111-1111-1111-1111-111111111117',
            name: 'Cyber Sécuriste',
            scope: 'ORGANIZATION',
            description: 'Assure la sécurité des systèmes, des données et des applications.',
        },

        // DevOps / Infrastructure
        {
            id: '11111111-1111-1111-1111-111111111118',
            name: 'Chef DevOps',
            scope: 'ORGANIZATION',
            description: 'Supervise les déploiements, l’infrastructure et l’automatisation des processus.',
        },
        {
            id: '11111111-1111-1111-1111-111111111119',
            name: 'DevOps',
            scope: 'ORGANIZATION',
            description: 'Gère les déploiements, l’infrastructure et l’automatisation des processus.',
        },

        // Test / QA
        {
            id: '11111111-1111-1111-1111-111111111120',
            name: 'Chef Testeur / QA',
            scope: 'ORGANIZATION',
            description: 'Supervise les tests et la qualité des produits.',
        },
        {
            id: '11111111-1111-1111-1111-111111111121',
            name: 'Testeur / QA',
            scope: 'ORGANIZATION',
            description: 'Teste les fonctionnalités et assure la qualité du produit.',
        },

        // -- Project --
        {
            id: '22222222-2222-2222-2222-222222222221',
            name: 'Chef de Projet',
            scope: 'PROJECT',
            description: 'Supervise les tâches, assigne les membres et suit l’avancement du projet.',
        },
        {
            id: '22222222-2222-2222-2222-222222222222',
            name: 'Développeur Frontend',
            scope: 'PROJECT',
            description: 'Développe l’interface utilisateur du projet.',
        },
        {
            id: '22222222-2222-2222-2222-222222222223',
            name: 'Développeur Backend',
            scope: 'PROJECT',
            description: 'Développe la logique serveur, API et bases de données.',
        },
        {
            id: '22222222-2222-2222-2222-222222222224',
            name: 'Fullstack Developer',
            scope: 'PROJECT',
            description: 'Travaille sur le frontend et le backend du projet.',
        },
        {
            id: '22222222-2222-2222-2222-222222222225',
            name: 'Designer UI/UX',
            scope: 'PROJECT',
            description: 'Conçoit l’expérience utilisateur et les interfaces graphiques.',
        },
        {
            id: '22222222-2222-2222-2222-222222222226',
            name: 'Testeur / QA',
            scope: 'PROJECT',
            description: 'Teste les fonctionnalités pour garantir la qualité du produit.',
        },
        {
            id: '22222222-2222-2222-2222-222222222227',
            name: 'DevOps / Infrastructure',
            scope: 'PROJECT',
            description: 'Gère le déploiement, les serveurs et l’automatisation.',
        }
    ]


    for (const role of roles) {
        await prisma.role.upsert({
            where: { id: role.id },
            update: {},
            create: role,
        })
    }

    console.log('✅ Roles insérés')

    // --- STATUS ---
    const statuses = [
        // Project
        { id: '44444444-1111-1111-1111-111111111111', name: 'En attente', type: 'PROJECT', color: '#FFA500' },
        { id: '44444444-2222-2222-2222-222222222222', name: 'En cours', type: 'PROJECT', color: '#007BFF' },
        { id: '44444444-3333-3333-3333-333333333333', name: 'Terminé', type: 'PROJECT', color: '#28A745' },

        // Task
        { id: '55555555-1111-1111-1111-111111111111', name: 'À faire', type: 'TASK', color: '#F39C12' },
        { id: '55555555-2222-2222-2222-222222222222', name: 'En cours', type: 'TASK', color: '#3498DB' },
        { id: '55555555-3333-3333-3333-333333333333', name: 'Terminé', type: 'TASK', color: '#2ECC71' },

        // Sub-task
        { id: '66666666-1111-1111-1111-111111111111', name: 'À faire', type: 'SUB_TASK', color: '#F39C12' },
        { id: '66666666-2222-2222-2222-222222222222', name: 'En cours', type: 'SUB_TASK', color: '#3498DB' },
        { id: '66666666-3333-3333-3333-333333333333', name: 'Terminé', type: 'SUB_TASK', color: '#2ECC71' },
    ]

    for (const status of statuses) {
        await prisma.status.upsert({
            where: { id: status.id },
            update: {},
            create: status,
        })
    }

    console.log('✅ Status insérés')
    console.log('🌾 Seeder terminé avec succès !')
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
