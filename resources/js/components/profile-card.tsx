interface ProfileCard {
  image_url: string
  title: string
  name: string
  description: string
}

export default function ProfileCard({
  description,
  image_url,
  name,
  title,
}: ProfileCard) {
  return (
    <div className="relative w-fit">
      <img
        src={image_url}
        alt={name}
        className="w-[283px] h-[317px] object-cover rounded-2xl border border-[#E2E8F0]"
      />
      <div className="absolute bg-white z-[2] border border-[#E2E8F0] py-[23px] px-[12px] rounded-2xl top-[150px] -right-[120px] max-w-[236px] w-full">
        <h5 className="font-semibold text-sm">{name}</h5>
        <p className="text-sm text-[#2874F0] mt-2 mb-[12px]">{title}</p>
        <p className="text-xs text-[#0F172A] italic">{description}</p>
      </div>
    </div>
  )
}
