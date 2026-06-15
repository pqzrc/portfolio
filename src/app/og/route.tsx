import { ImageResponse } from 'next/og'

export const runtime = 'nodejs';

export async function GET(request: Request) {
    const url = new URL(request.url)
    const title = url.searchParams.get('title') || 'Portfolio'

    const person = {
        name: 'Rénald DESIRE',
        role: 'Développeur Full Stack',
    };

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    padding: '8rem',
                    background: '#151515',
                }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: '4rem',
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        color: 'white',
                    }}>
                    <span
                        style={{
                            fontSize: '8rem',
                            lineHeight: '8rem',
                            letterSpacing: '-0.05em',
                            whiteSpace: 'pre-wrap',
                            textWrap: 'balance',
                        }}>
                        {title}
                    </span>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5rem'
                        }}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '12rem',
                                height: '12rem',
                                borderRadius: '100%',
                                background: '#34d399',
                                color: '#06130d',
                                fontSize: '4rem',
                                fontWeight: 800,
                            }}>
                            RD
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem'
                            }}>
                            <span
                                style={{
                                    fontSize: '4.5rem',
                                    lineHeight: '4.5rem',
                                    whiteSpace: 'pre-wrap',
                                    textWrap: 'balance',
                                }}>
                                {person.name}
                            </span>
                            <span
                                style={{
                                    fontSize: '2.5rem',
                                    lineHeight: '2.5rem',
                                    whiteSpace: 'pre-wrap',
                                    textWrap: 'balance',
                                    opacity: '0.6'
                                }}>
                                {person.role}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            width: 1920,
            height: 1080,
        }
    )
}
