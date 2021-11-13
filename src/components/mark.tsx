import React from "react"

export const Mark = ({ name, keyword }: { name: string, keyword?: string }) => {
    if (!keyword) {
        return <>{name}</>
    }
    const arr = name.split(keyword)
    return (
        <>{arr.map((str: string, index: number) => {
            // 'aba'.split('a')
            //  ['', 'b', '']
            return (
                <span key={index}>
                    {str}
                    {
                        index === arr.length - 1 ? null : <span style={{ color: '#257AFD' }}>
                            {keyword}
                        </span>
                    }
                </span>)
        })}
        </>
    )
}