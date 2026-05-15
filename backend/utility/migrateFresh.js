const db = require('../connection')
const Category = require('../model/CategoryModel')
const Post = require('../model/PostModel')

async function migrateFresh() {
    try {
        console.log('🔄 Starting database migration fresh...')

        // Force sync - ini akan drop tabel yang ada dan buat ulang
        await db.sync({ force: true })

        console.log('✅ Database migration fresh completed!')
        console.log('📋 Tables created:')
        console.log('   - categories')
        console.log('   - posts')

        process.exit(0)
    } catch (error) {
        console.error('❌ Migration fresh failed:', error)
        process.exit(1)
    }
}

// Jalankan jika file ini dieksekusi langsung
if (require.main === module) {
    migrateFresh()
}

module.exports = migrateFresh