"use client";

import { useState } from "react";
import { getRgbaColor, PRIMARY_COLORS_RGB } from "@/utils/colors";

interface ClientAvatarProps {
  name: string;
  image?: string;
  size?: number;
}

export default function ClientAvatar({ name, image, size = 48 }: ClientAvatarProps) {
  const [imageError, setImageError] = useState(false);
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  // Generate a consistent color based on the name
  const getColorFromName = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const shade = ["400", "500", "600"][Math.abs(hash) % 3];
    return getRgbaColor(PRIMARY_COLORS_RGB, shade, 0.9);
  };

  const avatarStyle = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: getColorFromName(name),
    fontSize: `${size / 2.5}px`,
  };

  if (image && !imageError) {
    return (
      <div 
        className="rounded-full overflow-hidden flex-shrink-0" 
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className="rounded-full overflow-hidden flex items-center justify-center text-white font-medium flex-shrink-0"
      style={avatarStyle}
      title={name}
    >
      {initials}
    </div>
  );
}
