// turns a fetch response into a small result for the forms
export const toResult = async (res: Response) => {
    const body = await res.json().catch(() => ({}))
    return { ok: res.ok, message: body.message as string | undefined }
}