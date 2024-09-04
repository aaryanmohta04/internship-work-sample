"use client";

import React, { useEffect, useState } from "react";
import {
  fetchBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  updateBannerOrder,
} from "@/lib/api/WebsiteBanner";
import BannerForm from "@/components/BannerForm";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Image from "next/image";
import Layout from "@/components/Layout";
import withAuth from "@/components/withAuth";
import TabsMenu from "@/components/TabsMenu";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid";
import ForbiddenPage from "@/components/ForbiddenPage";

const WebsiteBannersPage = () => {
  const [banners, setBanners] = useState<WebsiteBanner[]>([]);
  const [bannerUrls, setBannerUrls] = useState<Record<number, string>>({});
  const [selectedBanner, setSelectedBanner] = useState<WebsiteBanner | null>(
    null
  );
  const [forbidden, setForbidden] = useState<boolean>(false);
  const tabs = [
    { name: "Popular Brands", href: "/popular-brands/listing" },
    { name: "Banners", href: "/website-banner/listing" },
    { name: "New Arrivals", href: "/new-arrival/listing" },
  ];

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    const data = await fetchBanners();
    console.log(data);
    if (data.statusCode == 403) setForbidden(true);
    setBanners(data.banners);
    setBannerUrls(data.urls);
  };

  const handleCreateOrUpdate = async (data: WebsiteBanner) => {
    if (selectedBanner) {
      await updateBanner(selectedBanner.id, data);
    } else {
      await createBanner(data);
    }
    setSelectedBanner(null);
    loadBanners();
  };

  const handleDelete = async (id: number) => {
    await deleteBanner(id);
    loadBanners();
  };
  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const updatedBanners = [...banners];
    const [reorderedBanner] = updatedBanners.splice(result.source.index, 1);
    updatedBanners.splice(result.destination.index, 0, reorderedBanner);

    setBanners(updatedBanners);
    const updatedOrder = updatedBanners.map((item, index) => ({
      ...item,
      order: index + 1,
    }));
    await updateBannerOrder(updatedOrder);
  };
  if (forbidden) return <ForbiddenPage />;
  return (
    <Layout>
      <TabsMenu currentPage="Banners" tabs={tabs} />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Website Banners</h1>
        <div className="px-6 py-4 bg-gray-100 border border-gray-100 flex flex-row text-center">
          <div className="basis-3/12 font-bold ">Title</div>
          <div className="basis-4/12 font-bold">Image</div>
          <div className="basis-3/12 font-bold">URL</div>
          <div className="basis-2/12 font-bold">Action</div>
        </div>
        <div className="border border-gray-100 pb-2">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="banners">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid grid-cols-1 items-center"
                >
                  {banners?.map((banner, index) => (
                    <Draggable
                      key={banner.id}
                      draggableId={String(banner.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="px-4 py-4 whitespace-nowrap border border-gray-100 flex flex-row justify-between items-center"
                        >
                          <div className="text-center basis-3/12 flex flex-row space-x-4">
                            <Bars3Icon className="w-6 h-6" />
                            <div className="grow pr-4">{banner.title}</div>
                          </div>
                          {bannerUrls[banner.id] && (
                            <div style={{ width: "400px", height: "auto" }}>
                              <Image
                                src={bannerUrls[banner.id]}
                                alt={banner.title}
                                width={400}
                                height={200}
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL="../../../public/defaultPlaceholder.avif"
                              />
                            </div>
                          )}

                          <p className="text-sm text-gray-500 basis-3/12 text-center ">
                            {banner.url}
                          </p>
                          <div className="flex mt-2 space-x-2 basis-2/12 justify-center">
                            <div className="text-center w-12 h-6 flex flex-row space-x-1">
                              <TrashIcon
                                onClick={() => handleDelete(banner.id)}
                                className="text-blue-800"
                              />
                              <PencilIcon
                                onClick={() => setSelectedBanner(banner)}
                                className="text-blue-800"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className="mt-8">
          <BannerForm
            onSubmit={handleCreateOrUpdate}
            initialData={selectedBanner || undefined}
          />
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(WebsiteBannersPage);
