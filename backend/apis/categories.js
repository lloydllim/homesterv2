
module.exports = function categoriesApi(conn, app) {

    app.get('/categories', (req, res) => {
        const sql = `SELECT * FROM tbl_categories`

        conn.query(sql, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
            console.log(result)
            res.status(200).send(result)
        })
    })
    
    app.post(`/categories`, (req, res) => {
        const { name } = req.body
        const sql = `INSERT INTO tbl_categories (name) VALUES ('${name}')`
        
        conn.query(sql, (err, result) => {
            if ( err ) {
                return res.status(500).send(err)
            }

            console.log('\033[32m - 1 record added')
            res.status(200).send(result)
        })
    })

    app.put(`/categories/:id`, (req, res) => {
        const { name } = req.body
        const { id } = req.params

        const sql = `UPDATE tbl_categories SET name = '${name}' WHERE id = ${id}`

        conn.query(sql, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
            console.log('\033[32m - 1 record updated')
            res.status(200).send(result)
        })
    })

    app.delete(`/categories/:id`, (req, res) => {
        const { id } = req.params

        const sql = `DELETE FROM tbl_categories WHERE id = ${id}`

        conn.query(sql, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            console.log('\033[32m - 1 record deleted')
            res.status(200).send(result)
        })
    })
}